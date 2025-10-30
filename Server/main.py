from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import joblib
import tensorflow as tf
import pandas as pd

# Load static files
desc_df = pd.read_csv("data/symptom_Description[1].csv")
desc_dict = dict(zip(desc_df['Disease'].str.lower().str.strip(), desc_df['Description']))

prec_df = pd.read_csv("data/symptom_precaution[1].csv")
prec_dict = {
    row['Disease'].lower().strip(): [row['Precaution_1'], row['Precaution_2'], row['Precaution_3'], row['Precaution_4']]
    for _, row in prec_df.iterrows()
}

# Load model and encoders
model = tf.keras.models.load_model("models/disease_prediction_model.h5")
mlb = joblib.load("models/symptom_encoder.joblib")
le = joblib.load("models/label_encoder.joblib")

app = FastAPI(
    title="Symptom Analysis & Disease Prediction API",
    description="API with MongoDB integration",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SymptomInput(BaseModel):
    symptoms: List[str]

@app.get("/")
async def root():
    return {"message": "FastAPI server running with MongoDB connected"}

#--------------------------------Model-----------------------------------------------------
@app.post("/predict")
async def predict_disease(data: SymptomInput):
    input_symptoms = [s.strip().lower() for s in data.symptoms]

    try:
        input_vector = mlb.transform([input_symptoms])
    except Exception as e:
        return {"error": f"Invalid input symptoms: {str(e)}"}

    prediction = model.predict(input_vector)[0]
    top_indices = prediction.argsort()[-4:][::-1]

    results = []
    for index in top_indices:
        disease = le.inverse_transform([index])[0]
        confidence = float(prediction[index])
        disease_key = disease.lower().strip()
        description = desc_dict.get(disease_key, "No description available")
        precautions = prec_dict.get(disease_key, ["No precautions found"])

        results.append({
            "name": disease,
            "confidence": confidence,
            "description": description,
            "precautions": precautions
        })
    return {"predictions":results}