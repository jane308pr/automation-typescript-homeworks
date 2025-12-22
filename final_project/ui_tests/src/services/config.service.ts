import dotenv from 'dotenv-safe';
import { AppConfig } from '../models/api.config';

export class ConfigService {
    public constructor() {
        dotenv.config();
    }
    public get config(): AppConfig {
        return {
            uiForHelp: {
                baseUrl: process.env.API_FOR_HELP_BASE_URL || '',
                email: process.env.API_FOR_HELP_EMAIL ?? 'test@gmail.com',
                password:  process.env.API_FOR_HELP_PASSWORD ?? 'Test_p@ject123'
            }
        };
    }
}
