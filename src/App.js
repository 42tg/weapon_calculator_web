import React, { Component } from 'react';

import {Weapon} from './classes/Weapon'

class App extends Component {
  constructor(props){
    super(props)
    this.state ={ 
      lastCalculated: [],
      weaponDamage: "1W6",
      weaponSpeed:"6",
      fixDamage:"0",
      
      critical:"0",
      exact:"0",
      sharp:"0",
      massive: false,
      
   
    }
  }
  handleSubmit = (event) => { 
    
    const prevWeapons = this.state.lastCalculated
    let weapon = new Weapon(this.state.weaponDamage)
    weapon.setWeaponSpeed(this.state.weaponSpeed)
    weapon.setCritical(this.state.critical)
    
    weapon.setExact(this.state.exact)
    weapon.setSharp(this.state.sharp)
    weapon.setMassive(this.state.massive)
    weapon.averageDamage(1000)
    prevWeapons.push(weapon)
    this.setState({
      lastCalculated: prevWeapons
    })
    event.preventDefault()
  }
  handleChange = function (event){
    let object = {}
    if(event.target.name === 'massive') event.target.value = event.target.checked

    object[event.target.name] = event.target.value
    this.setState(object)
  }

  render() {
    return (
      <div>
        <header>
          <h1>Welcome to Weapon Calculator</h1>
        </header>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <select name="weaponDamage" id="weaponDamage" value={this.state.weaponDamage} onChange={this.handleChange.bind(this)}>
                <option disabled>___W6____</option>
                <option value="1W6">1W6</option>
                <option value="2W6">2W6</option>
                <option value="3W6">3W6</option>
                <option disabled>___W10___</option>
                <option value="1W10">1W10</option>
                <option value="2W10">2W10</option>
              </select>
              <label htmlFor="fixDamage">+</label> <input name="fixDamage" id="fixDamage" value={this.state.fixDamage} type="text" placeholder="fix Damage" onChange={this.handleChange.bind(this)}/>
            </div>
            <div>
              <label htmlFor="weaponSpeed">Waffengeschwindigkeit</label><input id="weaponSpeed" name="weaponSpeed" type="text" placeholder="WGS" value={this.state.weaponSpeed} onChange={this.handleChange.bind(this)}/>
            </div>
            <div>
              <label htmlFor="exact">Exakt</label> 
              <select id="exact" name="exact" onChange={this.handleChange.bind(this)} value={this.state.exact}>
                <option value="0">Nein</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div>
              <label htmlFor="critical">Kritisch</label>
              <select id="critical" name="critical" onChange={this.handleChange.bind(this)} value={this.state.critical}>
                <option value="0">Nein</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div>
              <label htmlFor="sharp">Scharf</label>
              <select id="sharp" name="sharp" onChange={this.handleChange.bind(this)} value={this.state.sharp}>
                <option value="0">Nein</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div>
              <label htmlFor="massive">Wuchtig ?</label> <input id="massive" name="massive" type="checkbox" value={this.state.massive} onChange={this.handleChange.bind(this)}/>  
            </div>  
            <div>
              <button type="submit">Berechnen</button><button type="reset">Leeren</button>
            </div>
          </form>
        </div>

        <div>
          <ul>
            { this.state.lastCalculated.map((weapon, id) => {
              return(
                <li key={id}> {weapon.toString()} - {weapon.lastCalculatedAverage}</li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
