import React, { Component } from 'react'
import { withRouter } from 'react-router'
//import { GC_USER_ID } from '../constants'

class Header extends Component {

  render() {
    //const userId = localStorage.getItem(GC_USER_ID)
    return (
      <div>
        <div className='header flex w-100 justify-between nowrap'>
          <h1 className='header__text w-100'>HAPPY LEAF ADMIN PORTAL</h1>
        </div>
        <div className='header__border-bottom'></div>
      </div>
    )
  }

}

export default withRouter(Header)
