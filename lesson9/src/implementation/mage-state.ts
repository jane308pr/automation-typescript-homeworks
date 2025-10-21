import { CharacterState } from './character-state';

export class MageState extends CharacterState {

    public constructor(
        public success: boolean,
        public message: string,
        public newStrength?: number,
        public remainingCoins?: number,
        public remainingMana?: number) {
        super(success, message, newStrength, remainingCoins);
        this.remainingMana;
    }
}
