export class CharacterState {

    public constructor(
        public success: boolean,
        public message: string,
        public newStrength?: number,
        public remainingCoins?: number
    ) {}

}
