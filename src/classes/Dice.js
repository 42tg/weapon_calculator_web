class Dice {

    constructor(diceNotation){
        if(!diceNotation) diceNotation = "1W6"
        const regex = /(\d*)[Ww](\d+)(?:([+-])(\d+))?/gm;
        let match = regex.exec(diceNotation)
        if(!match) throw Error('Cannot Parse dice String please Provide legal arguments like 1W6 / 2W10')

        this.notation = match[0]
        this.count = match[1]
        this.eyes = match[2]
        this.modifier = match[3] || '+' //?
        this.static = parseInt(match[4], 10) || 0// ?
    }

    roll = () => {
        const roll = (Math.floor(Math.random() * Math.floor(this.eyes - 1)) + 1)
        switch(this.modifier){
            case '+':
            return roll + this.static
            case '-':
            return roll - this.static
        }

        return roll
    }

    toString = () => {
        return `${this.count}W${this.eyes}` + ((this.static) ? this.modifier + this.static : ``)
    }
}

export default Dice