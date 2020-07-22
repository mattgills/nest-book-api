import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ServerResponse } from "http";

@Injectable()
export class AppendMetadataInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        let response: ServerResponse = context.switchToHttp().getResponse();
        // if (request.body.user !== request.user.id) {
        //     request.body.user = request.user.id;
        // }
        return next
            .handle()
            .pipe(
                map((body) => {
                    if (body.data) {
                        body = {
                            ...body,
                            metadata: {
                                language: 'TypeScript',
                                framework: 'Nest.js'
                            }
                        }
                    }
                    
                    return body;
                }),
            );
    }
}