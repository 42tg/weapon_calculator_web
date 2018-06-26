class Dice {

    constructor(diceNotation){
        if(!diceNotation) diceNotation = "1W6"
        const regex = /(\d*)[Ww](\d+)/gm;
        let match = regex.exec(diceNotation)
        if(!match) throw Error('Cannot Parse dice String please Provide legal arguments like 1W6 / 2W10')
        
        this.notation = match[0]
        this.count = match[1]
        this.eyes = match[2]
    }

    roll = () => {
        return (Math.floor(Math.random() * Math.floor(this.eyes - 1)) + 1)
    }

    toString = () => {
        return `${this.count}W${this.eyes}`
    }
}

export default Dice