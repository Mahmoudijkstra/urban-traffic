import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class HttpClientService {
  async graphqlRequest<T = any>(
    serviceUrl: string,
    query: string,
    variables?: Record<string, any>,
    token?: string,
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await axios.post(
        serviceUrl,
        { query, variables },
        { headers },
      );

      if (response.data.errors) {
        const error = response.data.errors[0];
        throw new HttpException(
          error.message || 'Service error',
          error.extensions?.code === 'UNAUTHENTICATED' ? 401 : 400,
        );
      }

      return response.data.data;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException(
        `Service unavailable: ${serviceUrl}`,
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
