import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as admin from 'firebase-admin';

@Injectable()
export class ChatgptService {
  private readonly _API_KEY = process.env.OPENAI_API_KEY;
  private readonly _MESSAGES_COLECCTION: string = 'messages';
  private readonly _DATA_BASE: admin.firestore.Firestore;

  constructor(
    @Inject('FIREBASE_ADMIN') private readonly _firebaseAdmin: admin.app.App,
  ) {
    this._DATA_BASE = this._firebaseAdmin.firestore();
  }

  public async getChatGptResponse(
    message: string,
    userId: string,
  ): Promise<string> {
    await this._DATA_BASE.collection(this._MESSAGES_COLECCTION).add({
      text: message,
      senderId: userId,
      isBot: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const geminiResponse = await this._callApi(message);

    await this._DATA_BASE.collection(this._MESSAGES_COLECCTION).add({
      text: geminiResponse,
      senderId: 'gemini_bot',
      isBot: true,
      responseTo: userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return geminiResponse;
  }

  private async _callApi(message: string): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this._API_KEY}`;

    try {
      const response = await axios.post(url, {
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      });
      console.log('HH', response.data.candidates[0].content.parts);
      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('DeepSeek error:', error.response?.data || error.message);
      throw new Error('Error al comunicarse con DeepSeek');
    }
  }
}
