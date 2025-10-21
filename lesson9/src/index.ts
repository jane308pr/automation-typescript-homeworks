import { ICharacter } from './abstraction/i-character';
import { ICharacterState } from './abstraction/i-character-state';
import { IWeapon } from './abstraction/i-weapon';
import { Character } from './implementation/character';
import { Mage } from './implementation/mage';
import { Weapon } from './implementation/weapon';

class Game {
    public constructor(
        public name: string
    ) {}

    public makeAttack(character: ICharacter, weapon: IWeapon): ICharacterState {
        console.log('Let the battle begin!!!');
        console.log(`"${character.name}" is preparing to attack!`);

        const buyResult = character.buyWeapon(weapon);

        if (!buyResult.success) {
            console.log(buyResult.message);
            console.log('Attack failed');
            console.log('--------------------------------');
            return buyResult;
        }

        const attackResult = character.attack();
        console.log(attackResult.message);
        console.log('--------------------------------');
        return attackResult;

    }
}

const fantasyBattle = new Game('Fantasy Battle');


const sword = new Weapon('Excalibur', 'Warrior', 50, 20);
const staff = new Weapon('Arcane Staff', 'Mage', 60, 10);
const magic = new Weapon('Arcane Staff', 'Mage', 60, 20);

const aragorn = new Character('Aragorn', 'Warrior', 30, 100);
const gandalf = new Mage('Gandalf', 40, 120, 0);

fantasyBattle.makeAttack(aragorn, sword);
fantasyBattle.makeAttack(aragorn, staff);
fantasyBattle.makeAttack(gandalf, staff);
fantasyBattle.makeAttack(gandalf, sword);

const gandalfSpellResult = gandalf.spell();
console.log(gandalfSpellResult.message);
gandalf.buyWeapon(magic);
const gandalfSecondSpellResult = gandalf.spell();
console.log(gandalfSecondSpellResult.message);

