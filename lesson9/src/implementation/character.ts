import { ICharacter } from '../abstraction/i-character';
import { IWeapon } from '../abstraction/i-weapon';
import { CharacterState } from './character-state';

export class Character implements ICharacter {
    public weapon: IWeapon | null = null;

    public constructor(
        public name: string,
        public type: string,
        protected _strength: number,
        protected _coins: number
    ) {}

    public get strength(): number {
        return this._strength;
    }

    public get coins(): number {
        return this._coins;
    }

    public buyWeapon(weapon: IWeapon): CharacterState {
        const result = this.getWeapon(weapon);
        if (!result.success) {
            return new CharacterState(result.success, result.message, this._strength, this._coins);
        }
        this._strength += weapon.power;

        return new CharacterState(true, `${this.name} bought ${weapon.name}.`, this._strength, this._coins);
    }

    public attack(): CharacterState {
        if (!this.weapon) {
            return new CharacterState(false, `${this.name} has no weapon to attack!`);
        }
        if (this._strength <= 0) {
            return new CharacterState(false, `${this.name} too weak to attack.`);
        }

        this._strength -= this.weapon.power * 0.5;

        return new CharacterState(true, `${this.name} is attacking with ${this.weapon.name}!`, this._strength);
    }

    protected getWeapon(weapon: IWeapon): CharacterState {
        if (weapon.type !== this.type) {
            return new CharacterState(false, `${this.name} (${this.type}) could not buy ${weapon.name} — type does not fit!`);
        }

        if (this._coins < weapon.price) {
            return new CharacterState(false, `${this.name} does not have enough coins to purchase ${weapon.name}.`);
        }

        this.weapon = weapon;
        this._coins -= weapon.price;
        return new CharacterState(true, `${this.name} has bought ${this.weapon.name}!`, this._coins);
    }

}
