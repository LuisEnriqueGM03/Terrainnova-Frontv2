import axios from "axios";

// Configuración para el microservicio de IA
const AI_API_BASE_URL = "http://localhost:3001";

export interface ChatMessage {
  user_id: string;
  message: string;
}

export interface ChatResponse {
  reply: string;
  user_id: string;
  context_length: number;
  imagenUrl?: string;
}

export interface ChatHistory {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  imagenUrl?: string;
}

class ChatService {
  private api = axios.create({
    baseURL: AI_API_BASE_URL,
    timeout: 30000, // 30 segundos de timeout
  });

  /**
   * Envía un mensaje al chatbot y obtiene la respuesta
   */
  async sendMessage(
    message: string,
    userId: string = "test_user"
  ): Promise<ChatResponse> {
    try {
      const response = await this.api.post("/chat", {
        user_id: userId,
        message: message,
      });
      return response.data;
    } catch (error) {
      console.error("Error enviando mensaje al chatbot:", error);
      throw new Error("No se pudo enviar el mensaje. Intenta de nuevo.");
    }
  }

  /**
   * Obtiene el historial de conversación de un usuario
   */
  async getChatHistory(userId: string = "test_user"): Promise<ChatHistory[]> {
    try {
      const response = await this.api.get(`/chat/${userId}/context`);
      return response.data.context || [];
    } catch (error) {
      console.error("Error obteniendo historial del chat:", error);
      return [];
    }
  }

  /**
   * Limpia el historial de conversación de un usuario
   */
  async clearChatHistory(userId: string = "test_user"): Promise<boolean> {
    try {
      await this.api.delete(`/chat/${userId}/context`);
      return true;
    } catch (error) {
      console.error("Error limpiando historial del chat:", error);
      return false;
    }
  }

  /**
   * Verifica la salud del servicio de IA
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await this.api.get("/health");
      // Considerar tanto "healthy" como "degraded" como estados válidos
      // "degraded" significa que funciona pero sin algunos servicios opcionales
      return (
        response.data.status === "healthy" ||
        response.data.status === "degraded"
      );
    } catch (error) {
      console.error("Error verificando salud del servicio:", error);
      return false;
    }
  }

  /**
   * Sube un archivo PDF o Word para que el bot lo lea y responda
   */
  async uploadFile(file: File, userId: string = "test_user"): Promise<ChatResponse> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", userId);
      const response = await this.api.post("/upload-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data && response.data.extracted_text) {
        const pregunta = "Resume el siguiente texto:\n" + response.data.extracted_text;
        const chatResponse = await this.api.post("/chat", {
          user_id: userId,
          message: pregunta
        });
        return chatResponse.data;
      } else {
        return response.data;
      }
    } catch (error) {
      console.error("Error subiendo archivo al chatbot:", error);
      throw new Error("No se pudo subir el archivo. Intenta de nuevo.");
    }
  }
}

export const chatService = new ChatService();
