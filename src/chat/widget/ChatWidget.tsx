import React, { useState, useEffect, useRef } from 'react';
import { chatService } from '../services/chatService';
import type { ChatHistory } from '../services/chatService';
import { BsChatDots, BsX, BsSend, BsTrash } from 'react-icons/bs';
import { parseChatMarkdown } from '../markdown/chatMarkdown';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  imagenUrl?: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isServiceAvailable, setIsServiceAvailable] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Verificar disponibilidad del servicio al cargar
  useEffect(() => {
    checkServiceHealth();
  }, []);

  // Cargar historial de chat al abrir
  useEffect(() => {
    if (isOpen) {
      loadChatHistory();
    }
  }, [isOpen]);

  // Auto-scroll al último mensaje
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus en el input cuando se abre el chat
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const checkServiceHealth = async () => {
    try {
      const isHealthy = await chatService.checkHealth();
      setIsServiceAvailable(isHealthy);
    } catch (error) {
      setIsServiceAvailable(false);
    }
  };

  const loadChatHistory = async () => {
    try {
      const history = await chatService.getChatHistory();
      const formattedMessages: Message[] = history.map((msg, index) => ({
        id: `history-${index}`,
        content: msg.content,
        isUser: msg.role === 'user',
        timestamp: new Date(msg.timestamp || Date.now()),
        imagenUrl: msg.imagenUrl,
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error cargando historial:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !isServiceAvailable) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(userMessage.content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.reply,
        isUser: false,
        timestamp: new Date(),
        imagenUrl: response.imagenUrl,
      };

      setMessages((prev: Message[]) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Lo siento, no pude procesar tu mensaje. Intenta de nuevo.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = async () => {
    try {
      await chatService.clearChatHistory();
      setMessages([]);
    } catch (error) {
      console.error('Error limpiando chat:', error);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botón flotante */}
      <div className="chat-widget-btn-wrapper">
        <button
          onClick={toggleChat}
          className="chat-widget-btn"
          title="Chat con IA"
        >
          <BsChatDots />
        </button>
      </div>

      {/* Panel de chat */}
      {isOpen && (
        <div className="chat-widget-panel">
          {/* Header */}
          <div className="chat-widget-header">
            <div className="chat-widget-header-title">
              <BsChatDots className="me-2 text-primary" />
              <span>Chat con IA</span>
            </div>
            <div>
              <button
                onClick={handleClearChat}
                className="chat-widget-header-btn"
                title="Limpiar chat"
              >
                <BsTrash />
              </button>
              <button
                onClick={toggleChat}
                className="chat-widget-header-btn"
                title="Cerrar chat"
              >
                <BsX />
              </button>
            </div>
          </div>

          {/* Estado del servicio */}
          {!isServiceAvailable && (
            <div className="chat-widget-alert">
              <small>⚠️ Servicio de IA no disponible</small>
            </div>
          )}

          {/* Mensajes */}
          <div className="chat-widget-messages">
            {messages.length === 0 ? (
              <div className="chat-widget-empty">
                <BsChatDots className="mb-2" style={{ fontSize: '2rem' }} />
                <p className="small">¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte?</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-widget-message ${message.isUser ? 'chat-widget-message-user' : 'chat-widget-message-assistant'}`}
                >
                  <div className="chat-widget-message-content">
                    {/* Mostrar imagen si existe en la respuesta del bot */}
                    {!message.isUser && message.imagenUrl && (
                      <img
                        src={`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${message.imagenUrl}`}
                        alt="Imagen del producto"
                        className="chat-widget-product-img"
                      />
                    )}
                    <div
                      className="small"
                      dangerouslySetInnerHTML={{
                        __html: !message.isUser ? parseChatMarkdown(message.content) : message.content
                      }}
                    />
                    <div className="chat-widget-message-time">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
            {/* Indicador de carga */}
            {isLoading && (
              <div className="chat-widget-message chat-widget-message-assistant">
                <div className="chat-widget-message-content">
                  <div className="d-flex align-items-center">
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                    <small className="text-muted">IA escribiendo...</small>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input y botón de envío */}
          <div className="chat-widget-input-wrapper">
            <div className="chat-widget-input-group">
              <input
                ref={inputRef}
                type="text"
                className="chat-widget-input"
                placeholder="Escribe tu mensaje..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading || !isServiceAvailable}
              />
              <button
                className="chat-widget-send-btn"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading || !isServiceAvailable}
              >
                <BsSend />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget; 