import { Module, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import * as jwt from 'jsonwebtoken'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { RoomModule } from './room/room.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [ GraphQLModule.forRoot({
    typePaths: ['./**/*.graphql'],
    context: ({req, connection}) => {
      if(connection) {
        return connection.context
      }
      return ({req})
    },
    definitions: {
      path: join(process.cwd(), 'src/graphql.ts'),
    },
    installSubscriptionHandlers: true,
    playground: true,

    subscriptions: {
      onConnect: async (connectionParams, ws) => {
        const header = connectionParams['Authorization']
        if(header) {
          const token = header.split('Bearer ')[1]
          try {
            const decoded = await jwt.verify(token, 's3cr3t')
            return decoded
          }
          catch(err) {
            throw new UnauthorizedException('Unthorization', 'User not unithorizws to connect')
          }
        }
        throw new BadRequestException('BadRequest', 'Bad Request To Connect.')
      }
    }
    }), UsersModule, AuthModule, RoomModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
