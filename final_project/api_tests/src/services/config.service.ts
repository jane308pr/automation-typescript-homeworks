import { AppConfig } from 'src/models/config/api.config';
import dotenv from 'dotenv-safe';

export class ConfigService {
    public constructor() {
        dotenv.config();
    }
    public getConfig(): AppConfig {
        return {
            api: {
                forHelpApi: {
                    baseUrl: process.env.API_FOR_HELP_BASE_URL_API || '',
                    cookiesHeader: process.env.API_FOR_HELP_COOKIES || undefined }
            }
        };
    }
}

