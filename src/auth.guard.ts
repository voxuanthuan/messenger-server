import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ) {
    const ctx = GqlExecutionContext.create(context)
    const {req} = ctx.getContext()
    const header = req && req.headers.authorization
    if(header) {
      try {
        const token = header.split('Bearer ')[1]
        const decoded = await jwt.verify(token, 's3cr3t')
        req.userID = decoded
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
}
