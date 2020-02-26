import { Injectable } from '@nestjs/common';
import { MessageInput, User, Message } from 'src/graphql';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class MessagesService {
  private messages: Message[] = []
  create(messageInput: MessageInput, userID): Message {
    const { roomID, content } = messageInput
    const id = uuidv4()
    const  message = {
      id,
      createdBy: userID,
      roomID,
      content,
      createdAt: Date.now()
    }
    this.messages.push(message)
    return message
  }
}
