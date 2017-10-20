import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'

class Header extends Component {

  render() {
    const userId = localStorage.getItem(GC_USER_ID)
    const path = this.props.location.pathname;
    return (
      <div>
        <div>
          <div className='header flex w-100 justify-between nowrap'>
            { userId && <div className='logout' onClick={() => {
              localStorage.removeItem(GC_USER_ID)
              localStorage.removeItem(GC_AUTH_TOKEN)
              this.props.history.push(`/login`)
            }}>logout</div> }
            <h1 className='header__text w-100'>
              { userId && path === '/' && "HAPPY LEAF KOMBUCHA" }
              { userId && path !== '/' && "HAPPY LEAF ADMIN PORTAL" }
              { (!userId && path === '/login') && "HAPPY LEAF ADMIN PORTAL" }
              { (!userId && path !== '/login') && "HAPPY LEAF KOMBUCHA" }
            </h1>
          </div>
          <div className='header__border-bottom'></div>
        </div>
      </div>
    )
  }

}

export default withRouter(Header)
