import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [mensajes, setMensajes] = useState([
    { remitente: 'bot', texto: '¡Hola! Soy el asistente experto de Autopago. ¿En qué te puedo ayudar hoy con el sistema?' }
  ]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(false);

  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const mensajeUsuario = input;
    const nuevosMensajes = [...mensajes, { remitente: 'usuario', texto: mensajeUsuario }];
    setMensajes(nuevosMensajes);
    setInput('');
    setCargando(true);

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/chat', { 
        mensaje: mensajeUsuario 
      });
      
      setMensajes([...nuevosMensajes, { remitente: 'bot', texto: res.data.respuesta }]);
    } catch (error) {
      setMensajes([...nuevosMensajes, { remitente: 'bot', texto: 'Error: No se pudo conectar con el servidor backend.' }]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="chat-container">
      <h2>🤖 Chatbot - Sistema Experto de Autopago</h2>
      <div className="chat-window">
        {mensajes.map((msg, index) => (
          <div key={index} className={`mensaje ${msg.remitente}`}>
            <p>{msg.texto}</p>
          </div>
        ))}
        {cargando && <div className="mensaje bot"><p>Pensando regla experta...</p></div>}
      </div>
      <form onSubmit={enviarMensaje} className="chat-input-form">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Escribe tu duda (ej. pago con tarjeta, fruver, datáfono...)" 
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;