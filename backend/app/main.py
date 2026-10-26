from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.rules import evaluar_consulta

app = FastAPI(title="Chatbot Autopago - Sistema Experto")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    mensaje: str

@app.get("/")
def inicio():
    return {"mensaje": "Servidor de Chatbot Autopago activo"}

@app.post("/api/chat")
def responder_chat(payload: ChatRequest):
    respuesta = evaluar_consulta(payload.mensaje)
    return {"respuesta": respuesta}