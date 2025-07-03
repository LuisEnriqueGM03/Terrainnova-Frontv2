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
            src={message.imagenUrl.startsWith('http') ? message.imagenUrl : `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${message.imagenUrl}`}
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