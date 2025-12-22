import { apiWorld } from '../src/hooks/test-setup';
import { describe, expect,  test } from 'vitest';

describe('The Jokes API integration tests', () => {


    describe('ForHelp tests', () => {

        test('get roles', async () => {
            const [response, types] = await apiWorld.forHelpApi.getRoles();

            expect(response.ok).toBeTruthy();
            expect(types).toBeDefined();
            expect(types).to.include('Users');

        });

    });
});
