import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FlavorList from './FlavorList'
import TapList from './TapList'
import { GC_USER_ID } from '../constants'
import gearIcon from '../images/icons/gear.png'

class LandingPage extends Component {

  render() {
    const userId = localStorage.getItem(GC_USER_ID)
    return (
      <div>
        { userId &&
        <div className="landingPage">
          <div className="fl w-50">
            <TapList />
          </div>
          <div className="fl w-50">
            <FlavorList />
          </div>
        </div>
        }
        { !userId &&
          <div className="public-taplist fl w-100">
            <TapList />
            <Link to="/login"><img className="admin-gear" alt="admin" src={gearIcon} /></Link>
          </div>
        }
      </div>
    )
  }

}

export default LandingPage
