from fastapi import FastAPI
from pydantic import BaseModel
import requests


app = FastAPI()

# Defining the POST request data
class URL(BaseModel):
    publicUrl: str

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
    
    if response.status_code == 200:
        return {
            "message": "Image received successfully."
        }