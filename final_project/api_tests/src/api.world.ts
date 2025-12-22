import { ForHelpApi } from './apis/forhelp-api/forhelp.api';
import { ConfigService } from './services/config.service';

export class ApiWorld {
    public readonly configService: ConfigService;
    private readonly _forHelpApi?: ForHelpApi;

    public constructor(configService: ConfigService, forHelpApi?: ForHelpApi) {
        this.configService = configService;
        this._forHelpApi = forHelpApi;
    }

    public get forHelpApi(): ForHelpApi {
        if (!this._forHelpApi) {
            throw new Error('Dogs API is not initialized. Did you forget to call withJokesApi()?');
        }
        return this._forHelpApi;
    }

}
