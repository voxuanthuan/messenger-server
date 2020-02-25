import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { UserInput } from 'src/graphql'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor (private readonly usersService: UsersService) {}
  async login(userInput: UserInput) {
    const {userName, password} = userInput
    const users = await this.usersService.getAllUser()
    const user = users.find(user => user.userName === userName)
    const data = await bcrypt.hash('12345', 10);
    if(user) {
      try {
        const match = await bcrypt.compare(password, user.password)
        if(match) {
          const token = await jwt.sign({userId: user.id}, 's3cr3t')
          return {token}
        }
      }
      catch(err) {
        console.log(err)
      }
    }
    throw new HttpException({status: HttpStatus.UNAUTHORIZED}, 401)
  }
}
