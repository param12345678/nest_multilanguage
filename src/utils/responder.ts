import { Injectable } from '@nestjs/common';

interface Pagination {
  [key: string]: any;
}

interface ErrorResponse {
  response: {
    status: number;
    statusText: string;
    data: {
      success?: boolean;
      message?: string;
      c?: string;
      errors?: string[];
    };
  };
}

@Injectable()
export class ResponderService {
  sendResponse(
    response: any,
    statusCode: number,
    status: string,
    data: any,
    message: string,
    // pagination: Pagination = {}
  ) {
    response.status(statusCode).json({
      status,
      data,
      message,
      // pagination,
    });
  }

  thirdPartyErrorResponse(response: any, error: ErrorResponse, base: string) {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      throw new Error(error.response.statusText);
    } else if (
      error.response &&
      error.response.data &&
      !error.response.data.success &&
      (error.response.data.message || error.response.data.c)
    ) {
      throw new Error(
        `${base} : ${error.response.data.message || error.response.data.c}`,
      );
    } else if (
      error.response &&
      error.response.data &&
      !error.response.data.success &&
      error.response.data.errors &&
      error.response.data.errors.length > 0
    ) {
      throw new Error(
        `${base} : ${error.response.data.errors
          .map((x) => JSON.stringify(x))
          .join('\n')}`,
      );
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.errors &&
      error.response.data.errors.length > 0
    ) {
      throw new Error(
        `${base} : ${error.response.data.message
        } : ${error.response.data.errors.join('\n')}`,
      );
    } else {
      throw new Error(JSON.stringify(error));
    }
  }
}
