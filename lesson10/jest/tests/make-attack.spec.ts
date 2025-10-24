import { expect as expectChai } from 'chai';
import { Character } from '../src/implementation/character';
import { Weapon } from '../src/implementation/weapon';
import { makeAttack } from '../src/index';

describe('Test the character\'s attack', () => {

    let coins: number;
    let strength: number;
    let warrior: Character;

    beforeEach(() =>  {
        coins = 100;
        strength = 0;
        warrior = new Character('Aragorn', 'Warrior', strength, coins);
    });

    describe('Test success attack', function() {

        it('The character could attack with suitable weapon when strength is enough.', () => {

            const sword = new Weapon('Excalibur', 'Warrior', 50, 20);

            const actualResult = makeAttack(warrior, sword);

            expectChai(actualResult.success).to.be.equal(true);
            expectChai(actualResult.newStrength).to.equal(strength, 'Returned incorrect strength after success attack');
            expectChai(actualResult.remainingCoins).to.equal(coins - sword.price, 'Returned incorrect left amount of coins after success attack');

        });

        it('The character state should be changed correctly after success attack', () => {

            const sword = new Weapon('Excalibur', 'Warrior', 50, 20);

            const actualResult = makeAttack(warrior, sword);

            expect(actualResult.success).toBe(true);
            expect(warrior.coins).toBe(coins - sword.price);
            expect(warrior.strength).toBe(strength);

        });
    });

    describe('Test failed attack', function() {

        it('The attack should fail when the character is buying the weapon of unsuitable type', () => {

            const sword = new Weapon('Excalibur', 'Mage', 50, 20);

            const actualResult = makeAttack(warrior, sword);

            expectChai(actualResult.success).to.be.equal(false);
            expectChai(actualResult.newStrength).to.equal(strength, 'Returned incorrect strength after failed attack');
            expectChai(actualResult.remainingCoins).to.equal(coins, 'Returned incorrect left amount of coins after failed attack');
            expect(warrior.coins).toBe(coins);
            expect(warrior.strength).toBe(strength);
        });

        it('The attack should fail when the character is buying too expensive weapon', () => {

            const sword = new Weapon('Excalibur', 'Warrior', 150, 20);

            const actualResult = makeAttack(warrior, sword);

            expectChai(actualResult.success).to.be.equal(false);
            expectChai(actualResult.newStrength).to.equal(strength, 'Returned incorrect strength after failed attack');
            expectChai(actualResult.remainingCoins).to.equal(coins, 'Returned incorrect left amount of coins after failed attack');
            expect(warrior.coins).toBe(coins);
            expect(warrior.strength).toBe(strength);
        });

        it('The attack should fail when the character is too weak.', () =>  {

            const sword = new Weapon('Excalibur', 'Warrior', 50, 0);

            const actualResult = makeAttack(warrior, sword);

            expectChai(actualResult.success).to.be.equal(false);
            expectChai(actualResult.newStrength).to.equal(strength, 'Returned incorrect strength after failed attack');
            expectChai(actualResult.remainingCoins).to.equal(coins - sword.price, 'Returned incorrect left amount of coins after failed attack');
            expect(warrior.coins).toBe(coins - sword.price);
            expect(warrior.strength).toBe(strength);

        });
    });

});

