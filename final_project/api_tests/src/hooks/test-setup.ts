import { beforeAll } from 'vitest';
import { ApiWorldBuilder } from '../api.world.builder';


let apiWorld: ReturnType<ApiWorldBuilder['build']>;

export { apiWorld };

beforeAll(() => {
    apiWorld = new ApiWorldBuilder().withForHelpApi().build();
});

