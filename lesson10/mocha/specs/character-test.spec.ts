import { expect } from 'chai';
import { Character } from 'src/character';
import { Weapon } from 'src/weapon';

describe('Test character', () => {

    let coins: number;
    let strength: number;
    let warrior: Character;

    beforeEach(() =>  {
        coins = 100;
        strength = 0;
        warrior = new Character('Aragorn', 'Warrior', strength, coins);
    });

    describe('Test buying the weapon', function() {

        it('The character could buy a weapon of a suitable type when coins are enough.', () => {

            const sword = new Weapon('Excalibur', 'Warrior', 50, 20);

            const actualResult = warrior.buyWeapon(sword);

            expect(actualResult.success).to.be.equal(true);
            expect(actualResult.newStrength).to.equal(strength + sword.power, 'Returned incorrect strength after success purchase');
            expect(actualResult.remainingCoins).to.equal(coins - sword.price, 'Returned incorrect left amount of coins after success purchase');
        });

        it('The character state should be changed corectly after success purchase.', () => {

            const sword = new Weapon('Excalibur', 'Warrior', 50, 20);

            const actualResult = warrior.buyWeapon(sword);

            expect(actualResult.success).to.be.equal(true);
            expect(warrior.coins).to.equal(coins - sword.price, 'Incorrect left amount of coins after success purchase');
            expect(warrior.strength).to.equal(strength + sword.power, 'Incorrect strength after success purchase');
        });

        it('The character could not buy the weapon of an unsuitable type.', () => {

            const sword = new Weapon('Excalibur', 'Mage', 50, 20);

            const actualResult = warrior.buyWeapon(sword);

            expect(actualResult.success).to.be.equal(false);
            expect(actualResult.newStrength).to.equal(strength, 'Returned incorrect strength after unsuccessful purchase');
            expect(actualResult.remainingCoins).to.equal(coins, 'Returned incorrect left amount of coins after unsuccessful purchase');
            expect(warrior.coins).to.equal(coins, 'Incorrect left amount of coins after unsuccessful purchase');
            expect(warrior.strength).to.equal(strength, 'Incorrect strength after unsuccessful purchase');
        });

        it('The character could not buy too expensive weapon.', () => {

            const sword = new Weapon('Excalibur', 'Warrior', 150, 20);

            const actualResult = warrior.buyWeapon(sword);

            expect(actualResult.success).to.be.equal(false);
            expect(actualResult.newStrength).to.equal(strength, 'Returned incorrect strength after unsuccessful purchase');
            expect(actualResult.remainingCoins).to.equal(coins, 'Returned incorrect left amount of coins after unsuccessful purchase');
            expect(warrior.coins).to.equal(coins, 'Incorrect left amount of coins after unsuccessful purchase');
            expect(warrior.strength).to.equal(strength, 'Incorrect strength after unsuccessful purchase');
        });

    });

    describe('Test attack', function() {

        it('The character could attack with available weapon when strength is enough.', () => {

            const sword = new Weapon('Excalibur', 'Warrior', 50, 20);
            warrior.buyWeapon(sword);

            const actualResult = warrior.attack();

            expect(actualResult.success).to.be.equal(true);
            expect(actualResult.newStrength).to.equal(strength, 'Returned incorrect strength after success attack');
            expect(actualResult.remainingCoins).to.equal(coins - sword.price, 'Returned incorrect left amount of coins after success attack');

        });

        it('The character state should be changed corectly after success attack.', () => {

            const sword = new Weapon('Excalibur', 'Warrior', 50, 20);
            warrior.buyWeapon(sword);

            const actualResult = warrior.attack();

            expect(actualResult.success).to.be.equal(true);
            expect(warrior.coins).to.equal(coins - sword.price, 'Incorrect left amount of coins after after success attack');
            expect(warrior.strength).to.equal(strength, 'Incorrect strength after success attack');

        });

        it('The attack should fail when the character is too weak.', () =>  {

            const sword = new Weapon('Excalibur', 'Warrior', 50, 0);
            warrior.buyWeapon(sword);

            const actualResult = warrior.attack();

            expect(actualResult.success).to.be.equal(false);
            expect(actualResult.newStrength).to.equal(strength, 'Returned incorrect strength after failed attack');
            expect(actualResult.remainingCoins).to.equal(coins - sword.price, 'Returned incorrect left amount of coins after failed attack');
            expect(warrior.coins).to.equal(coins - sword.price, 'Incorrect left amount of coins after failed attack');
            expect(warrior.strength).to.equal(strength, 'Incorrect strength after failed attack');

        });

        it('The attack should fail when the character has no weapon.', () =>  {

            const actualResult = warrior.attack();

            expect(actualResult.success).to.be.equal(false);
            expect(actualResult.newStrength).to.equal(strength, 'Returned incorrect strength after failed attack');
            expect(actualResult.remainingCoins).to.equal(coins, 'Returned incorrect left amount of coins after failed attack');
            expect(warrior.coins).to.equal(coins, 'Incorrect left amount of coins after failed attack');
            expect(warrior.strength).to.equal(strength, 'Incorrect strength after failed attack');

        });

    });


});

