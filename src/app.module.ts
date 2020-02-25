import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ GraphQLModule.forRoot({
    typePaths: ['./**/*.graphql'],
    context: ({req}) => ({req}),
    definitions: {
      path: join(process.cwd(), 'src/graphql.ts'),
    },
    playground: true,
    }), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
