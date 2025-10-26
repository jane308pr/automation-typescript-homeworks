import { expect } from 'chai';
import { Character } from '../src/implementation/character';
import { Weapon } from '../src/implementation/weapon';
import { makeAttack } from '../src/index';
import { CharacterState } from 'src/implementation/character-state';
import { stubConstructor } from 'ts-sinon';
import sinon from 'sinon';

describe('Test the character\'s attack', () => {

    const coins = 100;
    const weaponPrice = 50;
    const strength = 0;
    const weaponPower = 20;
    const mockedCharacter = stubConstructor(Character);
    const mockedWeapon = stubConstructor(Weapon);

    afterEach(() => {
        mockedCharacter.buyWeapon.reset();
        mockedCharacter.attack.reset();
        sinon.restore();
    });

    describe('Test success attack', function() {

        it('The character could attack with suitable weapon when strength is enough.', () => {

            const expectedStateAfterPurchase: CharacterState = {
                success: true,
                message: 'Aragorn bought Excalibur.',
                newStrength: strength + weaponPower,
                remainingCoins: coins - weaponPrice
            };
            const expectedStateAfterAttack: CharacterState = {
                success: true,
                message: 'Aragorn is attacking with Excalibur!',
                newStrength: strength,
                remainingCoins: coins - weaponPrice
            };
            mockedCharacter.buyWeapon.returns(expectedStateAfterPurchase);
            mockedCharacter.attack.returns(expectedStateAfterAttack);

            const actualResult = makeAttack(mockedCharacter, mockedWeapon);

            expect(actualResult.success).to.be.equal(expectedStateAfterAttack.success);
            expect(actualResult.message).to.be.equal(expectedStateAfterAttack.message);
            expect(actualResult.newStrength).to.equal(expectedStateAfterAttack.newStrength, 'Returned incorrect strength after success attack');
            expect(actualResult.remainingCoins).to.equal(expectedStateAfterAttack.remainingCoins, 'Returned incorrect left amount of coins after success attack');

        });

    });

    describe('Test failed attack', function() {

        it('The attack should fail when the character is buying the weapon of unsuitable type', () => {

            const expectedStateAfterPurchase: CharacterState = {
                success: false,
                message: 'Aragorn (Warrior) could not buy Excalibur — type does not fit!',
                newStrength: strength,
                remainingCoins: coins
            };
            mockedCharacter.buyWeapon.returns(expectedStateAfterPurchase);

            const actualResult = makeAttack(mockedCharacter, mockedWeapon);

            expect(actualResult.success).to.be.equal(expectedStateAfterPurchase.success);
            expect(actualResult.message).to.be.equal(expectedStateAfterPurchase.message);
            expect(actualResult.newStrength).to.equal(expectedStateAfterPurchase.newStrength, 'Returned incorrect strength after failed attack');
            expect(actualResult.remainingCoins).to.equal(expectedStateAfterPurchase.remainingCoins, 'Returned incorrect left amount of coins after failed attack');

        });

        it('The attack should fail when the character is buying too expensive weapon', () => {

            const expectedStateAfterPurchase: CharacterState = {
                success: false,
                message: 'Aragorn does not have enough coins to purchase Excalibur.',
                newStrength: strength,
                remainingCoins: coins
            };
            mockedCharacter.buyWeapon.returns(expectedStateAfterPurchase);

            const actualResult = makeAttack(mockedCharacter, mockedWeapon);

            expect(actualResult.success).to.be.equal(expectedStateAfterPurchase.success);
            expect(actualResult.message).to.be.equal(expectedStateAfterPurchase.message);
            expect(actualResult.newStrength).to.equal(expectedStateAfterPurchase.newStrength, 'Returned incorrect strength after failed attack');
            expect(actualResult.remainingCoins).to.equal(expectedStateAfterPurchase.remainingCoins, 'Returned incorrect left amount of coins after failed attack');

        });

        it('The attack should fail when the character is too weak.', () =>  {

            const expectedStateAfterPurchase: CharacterState = {
                success: true,
                message: 'Aragorn bought Excalibur.',
                newStrength: 0,
                remainingCoins: coins - weaponPrice
            };
            const expectedStateAfterAttack: CharacterState = {
                success: false,
                message: 'Aragorn too weak to attack.',
                newStrength: 0,
                remainingCoins: coins - weaponPrice
            };
            mockedCharacter.buyWeapon.returns(expectedStateAfterPurchase);
            mockedCharacter.attack.returns(expectedStateAfterAttack);

            const actualResult = makeAttack(mockedCharacter, mockedWeapon);

            expect(actualResult.success).to.be.equal(expectedStateAfterAttack.success);
            expect(actualResult.message).to.be.equal(expectedStateAfterAttack.message);
            expect(actualResult.newStrength).to.equal(expectedStateAfterAttack.newStrength, 'Returned incorrect strength after failed attack');
            expect(actualResult.remainingCoins).to.equal(expectedStateAfterAttack.remainingCoins, 'Returned incorrect left amount of coins after failed attack');

        });
    });

    describe('Test calling attack', function() {

        const character = new Character('Aragorn', 'warrior', 20, 10);
        const weapon = new Weapon('Magic Wand', 'warrior', 5, 10);

        it('Do not call attack when buying is failed', () => {

            const expectedStateAfterPurchase: CharacterState = {
                success: false,
                message: 'Aragorn does not have enough coins to purchase Excalibur.',
                newStrength: strength,
                remainingCoins: coins
            };
            const buyWeaponStub = sinon.stub(character, 'buyWeapon').returns(expectedStateAfterPurchase);
            const attackSpy = sinon.spy(character, 'attack');

            makeAttack(character, weapon);

            expect(buyWeaponStub.calledOnce).to.be.true;
            expect(attackSpy.called).to.be.false;

        });

        it('Call attack when buying is successful', () => {

            const expectedStateAfterPurchase: CharacterState = {
                success: true,
                message: 'Aragorn bought Excalibur.',
                newStrength: strength + weaponPower,
                remainingCoins: coins - weaponPrice
            };
            const expectedStateAfterAttack: CharacterState = {
                success: true,
                message: 'Aragorn is attacking with Excalibur!',
                newStrength: strength,
                remainingCoins: coins - weaponPrice
            };
            const buyWeaponStub = sinon.stub(character, 'buyWeapon').returns(expectedStateAfterPurchase);
            const attackStub = sinon.stub(character, 'attack').returns(expectedStateAfterAttack);

            makeAttack(character, weapon);

            expect(buyWeaponStub.calledOnce).to.be.true;
            expect(attackStub.calledOnce).to.be.true;

        });

    });

});


