from pydantic import BaseModel

class PatientData(BaseModel):
    Age: int
    Sex: int
    RestingBP:int 
    Cholesterol: int
    FastingBS: int
    MaxHR: int
    ExerciseAngina: int
    Oldpeak: float
    
    



