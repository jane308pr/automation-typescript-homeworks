import { Character } from './implementation/character';
import { CharacterState } from './implementation/character-state';
import { Weapon } from './implementation/weapon';


export function makeAttack(character: Character, weapon: Weapon): CharacterState {
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

    if (!attackResult.success) {
        console.log(attackResult.message);
        console.log('Attack failed');
        console.log('--------------------------------');
        return attackResult;
    }
    console.log('--------------------------------');

    return attackResult;

}
