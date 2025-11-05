import { TheJokesApi } from './apis/the-jokes-api/jokes.api';
import { ConfigService } from './services/config.service';

export class ApiWorld {
    public readonly configService: ConfigService;
    private readonly _jokesApi?: TheJokesApi;

    public constructor(configService: ConfigService, jokesImageApi?: TheJokesApi) {
        this.configService = configService;
        this._jokesApi = jokesImageApi;
    }

    public get jokesApi(): TheJokesApi {
        if (!this._jokesApi) {
            throw new Error('Dogs API is not initialized. Did you forget to call withJokesApi()?');
        }
        return this._jokesApi;
    }

}
