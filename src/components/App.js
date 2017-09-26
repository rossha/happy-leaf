import React, { Component } from 'react'
import LandingPage from './LandingPage'
import TapList from './TapList'
import CreateFlavor from './CreateFlavor'
import Header from './Header'
import Login from './Login'
import Search from './Search'
import LoadData from './LoadData'
import { Switch, Route } from 'react-router-dom'
import '../styles/header.css'

class App extends Component {

  render() {
    return (
      <div className='center'>
        <Header />
        <div className='content'>
          <Switch>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/search' component={Search}/>
            <Route exact path='/loadData' component={LoadData}/>
            <Route exact path='/' component={LandingPage}/>
            <Route exact path='/tapList' component={TapList}/>
            <Route exact path='/create' component={CreateFlavor}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
