import { ApiWorld } from './api.world';
import { ConfigService } from './services/config.service';
import { FetchApiService } from './services/fetch-api.service';
import { TheJokesApi } from './apis/the-jokes-api/jokes.api';

export class ApiWorldBuilder {
    private configService: ConfigService;
    private jokesApi?: TheJokesApi;

    public constructor() {
        this.configService = new ConfigService();
    }

    public withJokesApi(): this {
        const config = this.configService.getConfig();
        const jokesFetchApi = new FetchApiService(config.api.theJokesApi.baseUrl);
        this.jokesApi = new TheJokesApi(jokesFetchApi);
        return this;
    }

    public build(): ApiWorld {
        return new ApiWorld(this.configService, this.jokesApi);

    }
}
