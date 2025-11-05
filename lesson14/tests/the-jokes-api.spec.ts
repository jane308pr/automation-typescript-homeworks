import { JokeDto } from 'src/models/the-jokes-api/joke.dto';
import { apiWorld } from '../src/hooks/vitest-global-setup';
import { describe, expect,  test } from 'vitest';

describe('The Jokes API integration tests', () => {

    let jokeTypes: string[];
    let jokeId: number;
    let expectedJoke: JokeDto;

    describe('joke tests', () => {

        test('get joke types', async () => {
            const [response, types] = await apiWorld.jokesApi.getJokeTypes();

            jokeTypes = types;
            expect(response.ok).toBeTruthy();
            expect(types).toBeDefined();
            expect(types).to.have.length.greaterThan(0);

        });

        test('Verify that random joke has correct structure and expected type', async () => {
            const [response, joke] = await apiWorld.jokesApi.getRandomJoke();

            expect(response.ok).toBeTruthy();
            expect(joke).toBeDefined();
            expect(joke).to.have.keys('type', 'setup', 'punchline', 'id');

            const jokeType = joke.type;
            expect(jokeTypes).to.include(jokeType);

            jokeId = joke.id;
            expectedJoke = joke;

        });

        test('Verify that returns expected joke', async () => {
            const [response, actualJoke] = await apiWorld.jokesApi.getJokeById(jokeId);

            expect(response.ok).toBeTruthy();
            expect(actualJoke).toBeDefined();

            expect(actualJoke).to.be.deep.equal(expectedJoke);

        });

        test('Verify that returns 1 programming joke', async () => {
            const [response, programmingJokes] = await apiWorld.jokesApi.getRandomProgrammingJoke();

            expect(response.ok).toBeTruthy();
            expect(programmingJokes).toBeDefined();

            expect(programmingJokes).to.have.length(1);
            expect(programmingJokes[0].type).to.eql('programming');

        });

        test('Verify that returns 10 programming jokes', async () => {
            const [response, programmingJokes] = await apiWorld.jokesApi.getTenProgrammingJokes();

            expect(response.ok).toBeTruthy();
            expect(programmingJokes).toBeDefined();

            expect(programmingJokes).to.have.length(10);
            const type = new Set(programmingJokes.map(joke => joke.type));
            expect(type.size).to.be.equal(1);
            expect(Array.from(type)).to.deep.equal(['programming']);

        });

    });
});
