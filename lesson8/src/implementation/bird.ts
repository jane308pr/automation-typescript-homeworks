import { IAnimal } from '../abstraction/animal';

export class Bird implements IAnimal {

    public constructor(public name: string) {}

    public makeSound(): void {
        console.log(`${this.name} says: Tweet!`);
    }

}
