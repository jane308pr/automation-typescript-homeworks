import { ICharacterState } from './i-character-state';

export interface ICanSpell {
    spell(): ICharacterState;
}
