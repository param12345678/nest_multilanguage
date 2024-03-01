import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';


@Injectable()
export class AppService {
  constructor(private readonly i18n: I18nService) { }

  async getMessage(key: string, lang: string): Promise<string> {
    // Translate the message using the provided key and language
    return await this.i18n.translate(key, { lang });
  }
  getHello(): string {
    return 'Hello World!';
  }
}
