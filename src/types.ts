export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  avatar: string;
  systemPrompt: string;
  theme: string;
  isCustom?: boolean;
}

export interface ChatSession {
  id: string;
  characterId: string;
  messages: Message[];
  updatedAt: number;
}
