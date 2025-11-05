import { ApiWorldBuilder } from '../api.world.builder';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
export const apiWorld = new ApiWorldBuilder()
    .withJokesApi()
    .build();
