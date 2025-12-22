import { ApiWorld } from './api.world';
import { ConfigService } from './services/config.service';
import { FetchApiService } from './services/fetch-api.service';
import { ForHelpApi } from './apis/forhelp-api/forhelp.api';

export class ApiWorldBuilder {
    private configService: ConfigService;
    private forHelpApi?: ForHelpApi;

    public constructor() {
        this.configService = new ConfigService();
    }

    public withForHelpApi(): this {
        const config = this.configService.getConfig();

        const forHelpFetchApi = new FetchApiService(
            config.api.forHelpApi.baseUrl,
            config.api.forHelpApi.cookiesHeader
        );

        this.forHelpApi = new ForHelpApi(forHelpFetchApi);
        return this;
    }

    public build(): ApiWorld {
        return new ApiWorld(this.configService, this.forHelpApi);

    }
}
