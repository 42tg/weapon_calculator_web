import Dice from './Dice'


class Weapon {

    dice = new Dice()
    weaponSpeed = 6
    exact = 0
    critical = 0
    sharp = 0
    massive = false
    lastCalculatedAverage = 0
    constructor(diceString){
        this.dice = new Dice(diceString)
    }

    setDice = (dice) => {
        if (!(dice instanceof Dice)) throw Error('Expected Dice!')
        this.dice = dice
    }

    setWeaponSpeed = (wgs) => {
        if (wgs <= 0) throw Error('Weapon speed cannot be smaller or eqal zero')
        this.weaponSpeed = wgs;
    }

    setExact = (exact) => {
        this.exact = exact
    }
    hasExact = () => {
        return this.exact > 0
    }

    setMassive = (massive) => {
        this.massive = massive
    }
    hasMassive = () => {
        return this.massive
    }
    getMassiveBonus = () => {
        let eg = (Math.floor(Math.random() * 4) + 1);
        return eg * ((this.hasMassive() ? 2 : 1))
    }

    setCritical = (critical) => {
        this.critical = critical
    }
    hasCritical = () => {
        return this.critical > 0
    }

    setSharp = (sharp) => {
        this.sharp = sharp
    }
    hasSharp = () => {
        return this.sharp > 0
    }

    attack = () => {
        let sum = 0 
        for (let index = 0; index < this.dice.count; index++) {
            let roll = this.dice.roll()
            if(this.hasExact()){
                for (let index = 0; index < this.exact; index++) {
                    let additionalDice = this.dice.roll()
                    if(additionalDice > roll) roll = additionalDice
                }
            }
            if(this.hasSharp() && (roll < this.sharp)) roll = parseInt(this.sharp, 10)
            if(this.hasCritical() && (roll === parseInt(this.dice.eyes,10))) roll = roll + this.critical
            sum += roll
        }

        return sum
    }

    averageDamage = (numberOfTrys) => {
        let generator = AttackGenerator(this, numberOfTrys)
        let sum = 0
        let damage
        while((damage = generator.next()) && damage.done === false) {
            sum += damage.value;
        }
        
        let result = (sum / numberOfTrys / this.weaponSpeed);
        
        this.lastCalculatedAverage = result.toFixed(2)
        return result
    }

    toString = () => {
        return this.dice.toString() + (this.hasCritical() ? ' K' + this.critical : '') + (this.hasSharp() ? ' S' + this.sharp : '') + (this.hasExact() ? ' E' + this.exact : '') + (this.hasMassive() ? ' W' : '') 
    }
}

function* AttackGenerator(weapon, numberOfAttacks) {
    for (let index = 0; index < numberOfAttacks; index++) {
        yield weapon.attack()    
    }
}

export {Weapon, AttackGenerator};