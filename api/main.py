from fastapi import FastAPI
from pydantic import BaseModel
import requests
from PIL import Image
import io
import onnxruntime as ort
import numpy as np


app = FastAPI()
session = ort.InferenceSession("models/onnx/veriface_v2.onnx")
input_name = session.get_inputs()[0].name
class_names = ["ai", "real"]

# Defining the POST request data
class URL(BaseModel):
    publicUrl: str

# Predicting the output of the image
def get_model_prediction(image):
    # Ensure RGB
    image = image.convert("RGB")
    # Resize
    image = image.resize((224, 224))
    # Convert to numpy [0,1]
    image = np.asarray(image, dtype=np.float32) / 255.0
    # Normalize (same as training)
    mean = np.array([0.485, 0.456, 0.406], dtype=np.float32)
    std = np.array([0.229, 0.224, 0.225], dtype=np.float32)
    image = (image - mean) / std
    # HWC → CHW
    image = image.transpose(2, 0, 1)
    # Add batch dimension
    image = np.expand_dims(image, axis=0)
    # ONNX inference
    logits = session.run(None, {input_name: image})[0]
    # Stable softmax
    logits = logits - np.max(logits, axis=1, keepdims=True)
    exp = np.exp(logits)
    probs = exp / np.sum(exp, axis=1, keepdims=True)

    # Prediction
    pred_class = int(np.argmax(probs, axis=1)[0])
    confidence = float(probs[0, pred_class])
    return pred_class, confidence

# Health Route
@app.get("/")
def status_check():
    return {
        "message": "Server is running healthy.",
        "status": 200,
    }

# Sending the confirmation for receiving image
@app.post("/predict")
def predict(data: URL):
    response = requests.get(url=data.publicUrl)
    image = Image.open(io.BytesIO(response.content)).convert("RGB")
    
    predicted_class, confidence = get_model_prediction(image)

    if response.status_code == 200:
        return {
            "message": "Image received successfully!",
            "class": class_names[predicted_class],
            "confidence": confidence,
        }