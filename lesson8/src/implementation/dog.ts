import { IAnimal } from '../abstraction/animal';

export class Dog implements IAnimal {
    public constructor(public name: string) {}

    public makeSound(): void {
        console.log(`${this.name} says: Woof!`);
    }

}

export class FrenchBulldog extends Dog {
    public constructor(public name: string) {
        super(name);
    }

    public makeSnoring(): void {
        console.log(`${this.name} snoring a lot!`);
    }
}
