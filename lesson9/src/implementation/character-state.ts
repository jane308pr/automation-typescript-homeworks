import { ICharacterState } from '../abstraction/i-character-state';

export class CharacterState implements ICharacterState {

    public constructor(
        public success: boolean,
        public message: string,
        public newStrength?: number,
        public remainingCoins?: number
    ) {}

}
