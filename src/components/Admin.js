import React, { Component } from 'react'
import FlavorList from './FlavorList'
import TapList from './TapList'

class Admin extends Component {

  render() {

    return (
      <div className="landingPage">
        <div className="fl w-50">
          <TapList allFlavorsQuery={this.props.allFlavorsQuery} />
        </div>
        <div className="fl w-50">
          <FlavorList allFlavorsQuery={this.props.allFlavorsQuery} createFlavorMutation={this.props.createFlavorMutation} />
        </div>
      </div>
    )

  }

}

export default Admin
