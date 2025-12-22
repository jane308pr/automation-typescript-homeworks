import { IApiService } from 'src/services/abstractions/i-api-service';

export class ForHelpApi {
    public constructor(private readonly apiService: IApiService<Response>) {}

    public async getRoles(): Promise<[Response, string]> {
        const response = await this.apiService.get('/roles');
        const roles = await response.json();

        return [response, roles];
    }

}
