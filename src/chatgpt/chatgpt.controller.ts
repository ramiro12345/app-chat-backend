import { Body, Controller, Post } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';

@Controller('chatgpt')
export class ChatgptController {
  constructor(private readonly chatgptService: ChatgptService) {}

  @Post('reply')
  async getReply(
    @Body('message') message: string,
    @Body('userId') userid: string,
  ) {
    if (!message || !userid) {
      return { message: 'Message and userId son requeridos', status: false };
    }

    const reply = await this.chatgptService.getChatGptResponse(message, userid);

    return { message: reply, status: true };
  }
}
