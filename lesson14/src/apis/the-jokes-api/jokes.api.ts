import { JokeDto } from 'src/models/the-jokes-api/joke.dto';
import { IApiService } from 'src/services/abstractions/i-api-service';

export class TheJokesApi {
    public constructor(private readonly apiService: IApiService<Response>) {}

    public async getJokeTypes(): Promise<[Response, string[]]> {
        const response = await this.apiService.get('/types');
        const images = await response.json();

        return [response, images];
    }

    public async getRandomJoke(): Promise<[Response, JokeDto]> {
        const response = await this.apiService.get('/random_joke');
        const images = await response.json();

        return [response, images];
    }

    public async getJokeById(id: number): Promise<[Response, JokeDto]> {
        const response = await this.apiService.get(`/jokes/${id}`);
        const images = await response.json();

        return [response, images];
    }

    public async getRandomProgrammingJoke(): Promise<[Response, JokeDto[]]> {
        const response = await this.apiService.get('/jokes/programming/random');
        const images = await response.json();

        return [response, images];
    }

    public async getTenProgrammingJokes(): Promise<[Response, JokeDto[]]> {
        const response = await this.apiService.get('/jokes/programming/ten');
        const images = await response.json();

        return [response, images];
    }
}
