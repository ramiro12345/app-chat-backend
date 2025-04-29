import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [FirebaseModule, ChatgptModule, FirebaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
