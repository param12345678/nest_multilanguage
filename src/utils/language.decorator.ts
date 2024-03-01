// language.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Language = (lang: string) => SetMetadata('language', lang);
