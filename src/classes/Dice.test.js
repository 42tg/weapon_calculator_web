import Dice from './Dice'

describe('complete Dice', () => {
    let dice;
    const maxRollsIteration = 10000
    test('create Dice', () => {
        dice = new Dice()
        expect(dice.toString()).toBe(`1W6`)
    })
    test('standard dice roll 100 times', () => {
        for (let index = 0; index < maxRollsIteration; index++) {
            let result = dice.roll()
            expect(result).toBeGreaterThanOrEqual(1)
            expect(result).toBeLessThanOrEqual(6)
        }
    })

    test('create Custom Dice', () => {
        dice = new Dice(`2w10`)
        expect(dice.toString()).toBe(`2W10`)
    })

    test('roll custom dice 100 times', () => {
        dice = new Dice(`2w10`)
        for (let index = 0; index < maxRollsIteration; index++) {
            let result = dice.roll()
            expect(result).toBeGreaterThanOrEqual(1)
            expect(result).toBeLessThanOrEqual(20)
        }
    })
    describe('test dice with static', () => {

        test('Dice with static number', () => {
            dice = new Dice(`2W10+100`)
            expect(dice.toString()).toBe('2W10+100')
        })
        test('roll custom dice 100 times', () => {
            dice = new Dice(`2W10+100`)
            for (let index = 0; index < maxRollsIteration; index++) {
                let result = dice.roll()
                expect(result).toBeGreaterThanOrEqual(100)
                expect(result).toBeLessThanOrEqual(120)
            }
        })

        test('negativ static', () =>{
            dice = new Dice('1W6-6')
            expect(dice.toString()).toBe('1W6-6')
        })

        test('roll custom dice 100 times', () => {
            dice = new Dice(`1w10-10`)
            for (let index = 0; index < maxRollsIteration; index++) {
                let result = dice.roll()
                expect(result).toBeGreaterThanOrEqual(-10)
                expect(result).toBeLessThanOrEqual(0)
            }
        })
        test('Dice with static zero', () => {
            dice = new Dice(`2W10+0`)
            expect(dice.toString()).toBe('2W10')
        })
    })
})

test('create invalid Dice', () => {
    let error = null
    try {
        const dice = new Dice("132")
    } catch (err)
    {
        error = err
    }
    expect(error).not.toBeNull()
})