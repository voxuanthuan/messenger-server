import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const {req} = ctx.getContext()
    const header = req.headers.authorization
    if(header) {
      try {
        const token = header.split('Bearer ')[1]
        const decoded = jwt.verify(token, 's3cr3t')
        const {userID} = decoded
        req.userID = userID
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
}
