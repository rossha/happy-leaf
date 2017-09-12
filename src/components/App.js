import React, { Component } from 'react'
import FlavorList from './FlavorList'
import TapList from './TapList'
import CreateFlavor from './CreateFlavor'
import Header from './Header'
import Login from './Login'
import Search from './Search'
import LoadData from './LoadData'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className='center w85'>
        <Header />
        <div className='ph3 pv1'>
          <Switch>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/search' component={Search}/>
            <Route exact path='/loadData' component={LoadData}/>
            <Route exact path='/' component={FlavorList}/>
            <Route exact path='/tapList' component={TapList}/>
            <Route exact path='/create' component={CreateFlavor}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
