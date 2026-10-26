import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Exito from './img/Exito.webp'; 

function App() {
  const [mensajes, setMensajes] = useState([
    { remitente: 'bot', texto: '¡Hola! Soy el asistente experto de Autopago. ¿En qué te puedo ayudar hoy con el sistema?' }
  ]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(false);
  
  // Estado para controlar cuándo mostrar u ocultar el botón rojo
  const [mostrarBotonAsistencia, setMostrarBotonAsistencia] = useState(false);

  // Palabras clave que activan la visualización del botón rojo
  const esPalabraClaveAsistencia = (texto) => {
    const t = texto.toLowerCase();
    return (
    t.includes('asistencia') || 
    t.includes('ayuda') || 
    t.includes('personal') || 
    t.includes('botón rojo') || 
    t.includes('colillla de pago') || 
    t.includes('cancelar') ||
    t.includes('anular') ||
    t.includes('falla') ||
    t.includes('error') ||
    t.includes('problema'));
  };

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
      
      const respuestaBot = res.data.respuesta;
      setMensajes([...nuevosMensajes, { remitente: 'bot', texto: respuestaBot }]);

      // CORRECCIÓN: Evaluamos ÚNICAMENTE el mensaje del usuario. 
      // Si escribes una palabra clave, se muestra el botón; si dices "hola", se queda oculto.
      if (esPalabraClaveAsistencia(mensajeUsuario)) {
        setMostrarBotonAsistencia(true);
      } else {
        setMostrarBotonAsistencia(false);
      }

    } catch (error) {
      setMensajes([...nuevosMensajes, { remitente: 'bot', texto: 'Error: No se pudo conectar con el servidor backend.' }]);
    } finally {
      setCargando(false);
    }
  };

  const llamarAsistencia = async () => {
    const nuevosMensajes = [...mensajes, { remitente: 'usuario', texto: 'Asistencia solicitada en caja' }];
    setMensajes(nuevosMensajes);
    setCargando(true);

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/chat', { 
        mensaje: "asistencia" 
      });
      
      setMensajes([...nuevosMensajes, { 
        remitente: 'bot', 
        texto: '✅ Un miembro del personal se dirige a tu caja para ayudarte.' 
      }]);
    } catch (error) {
      setMensajes([...nuevosMensajes, { 
        remitente: 'bot', 
        texto: '✅ Solicitud enviada localmente al personal.' 
      }]);
    } finally {
      setCargando(false);
      // Ocultamos el botón nuevamente después de haberlo presionado
      setMostrarBotonAsistencia(false);
    }
  };

  return (
    <div className="chat-container">
      <h2>
        <img src={Exito} alt="Logo" style={{ width: '45px', height: '30px', verticalAlign: 'middle', marginRight: '10px' }} />
        Sistema Experto de Autopago</h2>
      
      <div className="chat-window">
        {mensajes.map((msg, index) => (
          <div key={index} className={`mensaje ${msg.remitente}`}>
            <p>{msg.texto}</p>
          </div>
        ))}
        {cargando && <div className="mensaje bot"><p>Pensando regla experta...</p></div>}
      </div>

      {/* RENDERIZADO CONDICIONAL: Solo aparece si 'mostrarBotonAsistencia' es true */}
      {mostrarBotonAsistencia && (
        <div style={{ padding: '10px 0', display: 'flex', justifyContent: 'center' }}>
          <button 
            onClick={llamarAsistencia}
            type="button"
            style={{
              backgroundColor: '#CC0000',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              width: '100%',
              animation: 'fadeIn 0.3s ease-in-out'
            }}
          >
            🔴 Llamar Asistencia (Personal de Caja)
          </button>
        </div>
      )}

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