import { AppConfig } from 'src/models/config/api.config';
import dotenv from 'dotenv-safe';

export class ConfigService {
    public constructor() {
        dotenv.config();
    }
    public getConfig(): AppConfig {
        return {
            api: {
                theJokesApi: { baseUrl: process.env.API_THE_JOKES_BASE_URL || '' }
            }
        };
    }
}

