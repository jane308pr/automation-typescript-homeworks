export class CharacterState implements CharacterState {

    public constructor(
        public success: boolean,
        public message: string,
        public newStrength?: number,
        public remainingCoins?: number
    ) {}

}
