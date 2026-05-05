FROM python:3.14-slim

WORKDIR /app

# Copy api folder contents into container
COPY api/ /app/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Hugging Face uses port 7860
EXPOSE 7860

# Run FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]