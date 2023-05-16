import { Injectable } from '@nestjs/common';

interface Message {
  message: string;
}

@Injectable()
export class AppService {
  getHello(): Message {
    return {
      message: 'Hello World!',
    };
  }
}
