import React, { Component } from 'react'
import FlavorList from './FlavorList'
import TapList from './TapList'

class LandingPage extends Component {

  render() {
    return (
      <div className="landingPage">
        <div className="fl w-50">
          <TapList />
        </div>
        <div className="fl w-50">
          <FlavorList />
        </div>
      </div>
    )
  }

}

export default LandingPage
