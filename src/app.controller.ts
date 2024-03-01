import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { I18n, I18nContext } from 'nestjs-i18n';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(@I18n() i18n: I18nContext) {
    return i18n.t(`test.here`);
  }

  @Get('/test')
  async getHello1(): Promise<string> {
    const message = await this.appService.getMessage('test.auth.loginSuccess', 'en'); // Specify translation key and language code
    return message;
  }


}
