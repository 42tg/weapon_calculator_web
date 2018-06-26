import Dice from './Dice'

describe('complete Dice', () => {
    let dice;
    test('create Dice', () => {
        dice = new Dice()
        expect(dice.toString()).toBe(`1W6`)
    })
    test('standard dice roll 100 times', () => {
        for (let index = 0; index < 100; index++) {
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
        for (let index = 0; index < 100; index++) {
            let result = dice.roll()
            expect(result).toBeGreaterThanOrEqual(1)
            expect(result).toBeLessThanOrEqual(10)
        }
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