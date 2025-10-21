import { IWeapon } from 'src/abstraction/i-weapon';
import { Character } from './character';
import { MageState } from './mage-state';
import { ICanSpell } from 'src/abstraction/i-can-spell';

export class Mage extends Character implements ICanSpell {
    private _mana: number;

    public constructor(name: string, strength: number, coins: number, mana: number) {
        super(name, 'Mage', strength, coins);
        this._mana = mana;
    }

    public get mana(): number {
        return this._mana;
    }

    public buyWeapon(weapon: IWeapon): MageState {
        const result = this.getWeapon(weapon);
        if (!result.success) {
            return new MageState(result.success, result.message, this._strength, this._coins, this._mana);
        }
        this._strength += weapon.power * 0.5;
        this._mana += weapon.power * 0.5;
        return new MageState(true, `${this.name} bought ${weapon.name}.`, this._strength, this._coins, this._mana);
    }

    public spell(): MageState {
        if (this._mana <= 10) {
            return new MageState(false, `${this.name} too weak to cast spell.`);
        }
        this._mana -= 10;

        return new MageState(
            true,
            `${this.name} cast a spell!`,
            this._strength,
            this._mana
        );
    }

}

