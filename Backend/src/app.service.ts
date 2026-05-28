import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }
  async create(user:{name:string, email:string})
  {

  }
}
