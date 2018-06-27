import React, { Component } from 'react';
import {Weapon} from './classes/Weapon'
import { Form, Select , Input, InputNumber, Switch, Button, Table, Layout } from 'antd';
const FormItem = Form.Item
const Option = Select.Option
const { Header, Footer, Content } = Layout;

class CalculateForm extends Component{
  internalSubmitHandler = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(err) return
      this.props.handleSubmit(values)
    })
  }

  render(){
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const { getFieldDecorator } = this.props.form;

    return(
      <Form onSubmit={this.internalSubmitHandler}>
        <FormItem  {...formItemLayout} label="Waffenwürfel">
          {getFieldDecorator('weaponDice', {
              initialValue: "1W6",
              rules: [{ required: true, message: "Der Waffenwürfel muss angegeben sein!" }],
            })(
                <Select>
                  <Option value="1W6">1W6</Option>
                  <Option value="2W6">2W6</Option>
                  <Option value="3W6">3W6</Option>
                  <Option value="1W10">1W10</Option>
                  <Option value="2W10">2W10</Option>
                </Select>
          )}
        </FormItem>
        <FormItem   {...formItemLayout} label="Waffenschaden">
          {getFieldDecorator('baseDamage', {
              rules: [{ required: false }],
            })(
              <Input name="baseDamage" type="text" placeholder="" addonBefore="+" addonAfter="Basisschaden" />
            )}
        </FormItem>
        <FormItem  {...formItemLayout} label="Waffengeschwindigkeit">
        {getFieldDecorator('weaponSpeed', {
            initialValue: 6,
            min: 1,
            max: 100,
            rules: [{ required: true, message: "Waffengeschwindigkeit wird benötigt"}],
          })(
             <InputNumber label="Waffengeschwindigkeit" addonAfter="Ticks"/>
          )}
        </FormItem>
        <FormItem  {...formItemLayout} label="Exakt">
          {getFieldDecorator('exact', {
              initialValue: "0",
            })(
                <Select>
                  <Option value="0">Nein</Option>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                </Select>
          )}
        </FormItem>
        <FormItem  {...formItemLayout} label="Kritisch">
          {getFieldDecorator('critical', {
              initialValue: "0",
            })(
                <Select>
                  <Option value="0">Nein</Option>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                </Select>
          )}
        </FormItem>
        <FormItem  {...formItemLayout} label="Scharf">
          {getFieldDecorator('scharp', {
              initialValue: "0",
            })(
                <Select>
                  <Option value="0">Nein</Option>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                </Select>
          )}
        </FormItem>
        <FormItem  {...formItemLayout} label="Wuchtig" colon={true}>
          {getFieldDecorator('massive', {
              initialValue: false,
            })(
              <Switch/>
          )}
        </FormItem>
        <FormItem  {...formItemLayout} label=" " colon={false}>
          <Button type="primary" htmlType="submit"> Berechnen </Button>
        </FormItem>
    </Form>
  )}
}

const CreatedCalculateForm = Form.create()(CalculateForm);

class App extends Component {
  constructor(props){
    super(props)
    this.state = { 
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

  handleSubmit = function(values) { 
    const state = this.state;
    const prevWeapons = state.lastCalculated || []
    
    let weapon = new Weapon(values.weaponDice)
    weapon.setWeaponSpeed(values.weaponSpeed)
    weapon.setCritical(values.critical)
    
    weapon.setExact(values.exact)
    weapon.setSharp(values.scharp)
    weapon.setMassive(values.massive)
    weapon.averageDamage(1000)
    prevWeapons.push(weapon)

    this.setState(state)
  }

  render() {    
    return (
      <div>
        <Layout>
          <Header >
            <h1 style={{ color: '#fff' }}>Welcome to Weapon Calculator</h1>
          </Header>
          <Layout>
            <Content style={{ padding: '0 50px' }}>

            <div>
              <CreatedCalculateForm handleSubmit={this.handleSubmit.bind(this)}/>
            </div>

            <div>
              <Table columns={[
                  {
                    title: 'Schaden',
                    dataIndex: 'weaponDamage',
                    key: 'weaponDamage',
                    filters:[ {text: '1W6', value: '1W6' }, {text: '2W6', value: '2W6' }, {text: '3W6', value: '3W6' }, {text: '1W10', value: '1W10' }, {text: '2W10', value: '2W10' }],
                    onFilter: (value, record) => {
                      return (record.weaponDamage === value)
                    },
                  },
                  {
                    title: 'WGS',
                    dataIndex: 'weaponSpeed',
                    key: 'weaponSpeed',
                  },
                  {
                    title: 'Exact',
                    dataIndex: 'exact',
                    key: 'exact',
                    render: text => ((text==='0') ? 'Nein' : text)
                  },
                  {
                    title: 'Kritisch',
                    dataIndex: 'critical',
                    key: 'critical',
                    render: text => ((text==='0') ? 'Nein' : text)
                  },
                  {
                    title: 'Scharf',
                    dataIndex: 'scharp',
                    key: 'scharp',
                    render: text => ((text==='0') ? 'Nein' : text)
                  },
                  {
                    title: 'Wuchtig',
                    dataIndex: 'massive',
                    key: 'massive',
                    filters:[ {text: 'Ja',value: true }, {text:'Nein', value:false}],
                    render: text => ((text===true) ? 'Ja' : 'Nein'),
                    onFilter: (value, record) => {
                      return (record.massive === (value==="true"))
                    },
                  },
                  {
                    title: 'Durchschnittschaden',
                    dataIndex: 'lastCalculatedAverage',
                    key: 'lastCalculatedAverage',
                    sorter: (a, b) => a.lastCalculatedAverage - b.lastCalculatedAverage
                  }
                ]} dataSource={this.state.lastCalculated.map((weapon, id) => {
                  return {
                    weaponDamage : weapon.dice.toString(),
                    weaponSpeed : weapon.weaponSpeed,
                    exact : weapon.exact,
                    critical : weapon.critical,
                    scharp : weapon.sharp,
                    massive : weapon.massive,
                    lastCalculatedAverage : weapon.lastCalculatedAverage,
                    key : id
                  }
                })} />
            </div>
            </Content>
          </Layout>
          <Footer style={{ textAlign: 'center' }}>
            <span role="img" aria-label="love">💗</span>
          </Footer>
          
        </Layout>
      </div>
    );
  }
}

export default App;
