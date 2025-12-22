import { IApiService } from './abstractions/i-api-service';

export class FetchApiService implements IApiService<Response> {
    public constructor(
        private readonly baseUrl: string,
        private readonly cookieHeader?: string
    ) {}

    public async get(uri: string, params?: Record<string, string | number | boolean>, headers?: Record<string, string>): Promise<Response> {
        const defaultHeaders = this.getDefaultHeaders(headers);
        const queries = params ? '?' + Object.entries(params || {}).map(([key, value]) => `${key}=${value}`).join('&') : '';
        const url = `${this.baseUrl}${uri}${queries}`;
        return await fetch(url, {
            method: 'GET',
            headers: defaultHeaders
        });
    }

    public async post(uri: string, body: unknown, headers?: Record<string, string>): Promise<Response> {
        const defaultHeaders = this.getDefaultHeaders(headers);

        return await fetch(`${this.baseUrl}${uri}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: defaultHeaders
        });
    }
    public async postForm(uri: string, formData: FormData, headers?: Record<string, string>): Promise<Response> {
        const defaultHeaders = this.getDefaultHeaders(headers);

        return await fetch(`${this.baseUrl}${uri}`, {
            method: 'POST',
            body: formData,
            headers: defaultHeaders
        });
    }
    public async put(uri: string, body: unknown, headers?: Record<string, string>): Promise<Response> {
        const defaultHeaders = this.getDefaultHeaders(headers);

        return await fetch(`${this.baseUrl}${uri}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: defaultHeaders
        });
    }

    private getDefaultHeaders(headers?: Record<string, string>): Record<string, string> {
        return {
            ...this.getCookieHeaders(),
            ...headers,
            ...{
                Accept: 'application/json'
            }
        };
    }

    private getCookieHeaders(): Record<string, string> {
        const headers: Record<string, string> = {};
        if (this.cookieHeader) {
            headers['Cookie'] = this.cookieHeader;
        }
        return headers;
    }
}
