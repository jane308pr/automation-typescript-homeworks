import { ICharacterState } from './i-character-state';
import { IWeapon } from './i-weapon';

export interface ICharacter {
    name: string;
    type: string;
    strength: number;
    coins: number;
    weapon: IWeapon | null;
    buyWeapon(weapon: IWeapon): ICharacterState;
    attack(): ICharacterState;
}
