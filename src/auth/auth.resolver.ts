import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserCreateInput, UserInput, AuthPayload } from 'src/graphql';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
    ) {}
  @Mutation()
  @UseGuards(AuthGuard)
  async register(@Args('userCreateInput') userCreateInput: UserCreateInput){
    return await this.usersService.createUser(userCreateInput)
  }
  @Mutation()
  async login(@Args('userInput') userInput: UserInput): Promise<AuthPayload> {
    return this.authService.login(userInput)
  }
}
