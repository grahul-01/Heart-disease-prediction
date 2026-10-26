from pathlib import Path
import fastapi
from schemas import PatientData
import pickle
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from fastapi.middleware.cors import CORSMiddleware




app = fastapi.FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


BASE_DIR = Path(__file__).resolve().parent
# MODEL_DIR = BASE_DIR /"model"

with open(BASE_DIR/"project_3.pkl" , "rb") as f:
    model = pickle.load(f)
    
#with open(BASE_DIR/"scaler_3.pkl","rb") as g:
#    scaler = pickle.load(g)
    
    
@app.get("/")
def home():
    return ("Heart disease prediction api")
    

@app.post("/predict")
def predict(data: PatientData):
    
    feature = np.array([[
        data.Age,
        data.Sex,
        data.RestingBP,
        data.Cholesterol,
        data.FastingBS,
        data.MaxHR,
        data.ExerciseAngina,
        data.Oldpeak,
        
        
    ]])
    
    
    
    #scaled = scaler.transform(feature)
    
    
    prediction = model.predict(feature)[0]
    probability = model.predict_proba(feature)[0]
    
    
    if prediction == 1:
        result = " heart disease"
    else:
        result =  " No Heart diisease"
        
        
    return {
        "prediction" : int(prediction),
        "result": result,
        "proba" : probability.tolist()
    }