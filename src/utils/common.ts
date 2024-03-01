import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';

export function extractLanguageFromHeader(request: Request): string {
    let lang = 'en'; // Default language

    // Check if the Accept-Language header is present in the request
    if (request.headers['accept-language']) {
        // Extract the language from the Accept-Language header
        lang = request.headers['accept-language'].split(',')[0].trim().toLowerCase();
    }

    return lang;
}

export function Headers(lang?: string) {
    return applyDecorators(
        ApiHeader({
            name: 'Accept-Language',
            description: 'Language preference',
            required: false,
            schema: {
                type: 'string',
                example: lang || 'en', // Example set to extracted language or default 'en'
            },
        }),
    );
}