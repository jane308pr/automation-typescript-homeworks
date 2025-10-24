import { IWeapon } from '../abstraction/i-weapon';

export class Weapon implements IWeapon {
    public constructor(
        public name: string,
        public type: string,
        public price: number,
        public power: number
    ) {}
}
