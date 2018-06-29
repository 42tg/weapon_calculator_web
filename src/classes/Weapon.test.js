import {Weapon, AttackGenerator} from './Weapon'
import Dice from './Dice'

test('1. Weapon creation without parameter should not break the code', () => {
    let error = null
    try{
        let weapon = new Weapon();
    } catch (err){
        error = err
    }
    expect(error).toBeNull()
})

test('2. Weapon attack from default Weapon has to be between 1 and 6', () => {
    let weapon = new Weapon()
    for (let index = 0; index < 100; index++) {
        let damage = weapon.attack()
        expect(damage).toBeGreaterThanOrEqual(1)
        expect(damage).toBeLessThanOrEqual(6)    
    }
})

test('3. Try to assign invalid Dice', () => {
    let weapon = new Weapon()
    let error = null
    try{
        weapon.setDice('im no dice!!')
    } catch (err){
        error = err
    }
    expect(error).not.toBeNull()
})

test('4. Assign new Dice', () => {
    let weapon = new Weapon()
    weapon.setDice(new Dice('2W10'))
    expect(weapon.dice.toString()).toBe('2W10')
})

test('5. Attack with new Dice', () => {
    let weapon = new Weapon('2W20')
    weapon.setWeaponSpeed(1)
    for (let index = 0; index < 100; index++) {
        let damage = weapon.attack()
        expect(damage).toBeGreaterThanOrEqual(2)
        expect(damage).toBeLessThanOrEqual(40)    
    }
})

test('6. set Weapon Speed', () => {
    let weapon = new Weapon('2W20')
    weapon.setWeaponSpeed(1)
    expect(weapon.weaponSpeed).toBe(1)

    function testFunc(){
        weapon.setWeaponSpeed(0)
    }
    expect(testFunc).toThrowError()

})

test('7. Attack Generator', () => {
    let weapon = new Weapon('2W20')
    weapon.setWeaponSpeed(1)
    let generator = AttackGenerator(weapon, 100)
    let result
    while((result = generator.next()) && result.done == false)   
    {
        expect(result.value).toBeGreaterThanOrEqual(2)
        expect(result.value).toBeLessThanOrEqual(40)
    }
})

test('8. Average Damage', () => {
    let weapon = new Weapon('2W20')
    weapon.setWeaponSpeed(1)
    
    for (let index = 1; index < 100; index++) {
        let damage = weapon.averageDamage(index)
        expect(damage).toBeGreaterThanOrEqual(2)
        expect(damage).toBeLessThanOrEqual(40)
    }
})

test('9. exact weapon', () => {
    let weapon = new Weapon('1W20')
    weapon.setExact(2)
    expect(weapon.hasExact()).toBe(true)
    expect(weapon.exact).toBe(2)
    weapon.attack()
    let damage = weapon.averageDamage(100)
    expect(damage).toBeGreaterThanOrEqual(1)
    expect(damage).toBeLessThanOrEqual(20)
    
})

test('10. Sharp weapon', () => {
    let weapon = new Weapon('2W20')
    weapon.setWeaponSpeed(1)
    weapon.setSharp(20)
    expect(weapon.sharp).toBe(20)
    expect(weapon.averageDamage(200)).toBeCloseTo((20) *2)
})

test('11. critical weapon', () => {
    let weapon = new Weapon('2W20')
    weapon.setWeaponSpeed(1)
    weapon.setSharp(20)
    expect(weapon.sharp).toBe(20)
    weapon.setCritical(100)
    expect(weapon.critical).toBe(100)
    expect(weapon.averageDamage(200)).toBeCloseTo((120) * 2)
})

test('12. massive Bonus', () => {
    let weapon = new Weapon()
    for (let index = 0; index < 100; index++) {
        let bonus = weapon.getMassiveBonus()
        expect(bonus).toBeGreaterThanOrEqual(0)
        expect(bonus).toBeLessThanOrEqual(4)
    }
    weapon.setMassive(true)
    for (let index = 0; index < 100; index++) {
        let bonus = weapon.getMassiveBonus()
        expect(bonus).toBeGreaterThanOrEqual(0)
        expect(bonus).toBeLessThanOrEqual(8)
    }
})

test('13. stringify', () => {
    let weapon = new Weapon()
    expect(weapon.toString()).toBe('1W6')
})
