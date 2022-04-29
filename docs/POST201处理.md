

https://stackoverflow.com/questions/58824401/disable-status-201-for-all-posts-in-nestjs

```
@Injectable()
export class PostInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    if (request.method === 'post') response.status = HttpStatus.OK;

    // Probably have to do something a bit more complex than this but this is the general gist
  }
}
```

>上面的方法有语法报错问题


临时解决方案: 在接口指定 code

```
@HttpCode(200)
```