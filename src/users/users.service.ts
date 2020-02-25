import { Injectable } from '@nestjs/common'
import { User, UserCreateInput } from 'src/graphql'
import * as uuid from 'uuid'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  private readonly users: User[] = [{id: '1234', firstName: "Xuan",
  lastName: "Thuan",
  userName: "thuan.vo",
  password: "$2b$10$.SBKd6Qhj3MnT1iFKEsJ0e/TO6sP61f6fXNBEcrV.2dphn58cOejy"}]
  getUserById(id: String): User {
    return this.users.find(user => user.id === id)
  }

  async createUser(userCreateInput: UserCreateInput): Promise<User> {
    const {firstName, lastName, userName, password} = userCreateInput
    const saltRounds = 10

    return bcrypt.hash(password, saltRounds)
      .then((password_hashed) => {
        const user = {
          id: uuid.v4(),
          firstName,
          lastName,
          userName,
          password: password_hashed
        }
        this.users.push(user)
        return user
      })
      .catch(err => {
        console.log(err)
      })
    
  }

  async getAllUser() {
    return this.users
  }
}
