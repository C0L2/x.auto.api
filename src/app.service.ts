import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'NestJs back end application for shootbox.md';
  }
}
