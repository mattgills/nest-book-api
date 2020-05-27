import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
}

@Injectable()
export class SetUserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        let request = context.switchToHttp().getRequest();
        if (request.body.user !== request.user.id) {
            request.body.user = request.user.id;
        }
        return next.handle();
    }
}