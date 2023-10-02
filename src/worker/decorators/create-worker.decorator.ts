import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentWorker = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);