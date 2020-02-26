import { Resolver, Subscription, Context, Mutation, Args } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions'
import { Message, User } from 'src/graphql';
import { MessagesService } from './messages.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { CurrentUser } from 'src/common/user.context';

const pubSub = new PubSub()

@Resolver('Messages')
export class MessagesResolver {
  constructor (private readonly messagesService: MessagesService) {}
  @Mutation()
  @UseGuards(AuthGuard)
  async createMessage(@Args('message') message: Message, @CurrentUser() user) {
    const createdMessage = await this.messagesService.create(message, user.userID)
    
    pubSub.publish('messageCreated', {messageCreated: createdMessage})
    return createdMessage
  }
  @Subscription('messageCreated', {
    filter: (payload, variables, context) => {
      const { messageCreated } = payload
      if(context.privileges.includes(messageCreated.roomID)) {
        return messageCreated.roomID === variables.roomID
      }
      return false
    }
  }) 
  messageCreated() {
    return pubSub.asyncIterator('messageCreated')
  }
}
