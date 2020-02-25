import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User, UserInput, } from 'src/graphql';

@Resolver('Users')
export class UsersResolver {
  constructor (private readonly usersService: UsersService) {
  }

  @Query()
  async getUser(@Args('id') id: String): Promise<User> {
    return await this.usersService.getUserById(id)
  } 
}
