import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'

class Header extends Component {

  render() {
    const userId = localStorage.getItem(GC_USER_ID)
    return (

      <div className='flex pa1 justify-between nowrap'>
        <div className='flex flex-fixed black'>
          <div className='fw7 mr1'>Happy Leaf Kombucha</div>
          <Link to='/' className='ml1 no-underline black'>All Flavors</Link>
          <div className='ml1'>|</div>
          <Link to='/search' className='ml1 no-underline black'>Search</Link>
          {userId &&
          <div className='flex'>
            <div className='ml1'>|</div>
            <Link to='/create' className='ml1 no-underline black'>Add A Flavor</Link>
          </div>
          }
          <div className='flex'>
            <div className='ml1'>|</div>
            <Link to='/loadData' className='ml1 no-underline black'>Load Sample Flavors</Link>
          </div>
          <div className='flex'>
            <div className='ml1'>|</div>
            <Link to='/tapList' className='ml1 no-underline black'>What's On Tap</Link>
          </div>
        </div>
        <div className='flex flex-fixed'>
          {userId ?
            <div className='ml1 pointer black' onClick={() => {
              localStorage.removeItem(GC_USER_ID)
              localStorage.removeItem(GC_AUTH_TOKEN)
              this.props.history.push(`/new/1`)
            }}>logout</div>
            :
            <Link to='/login' className='ml1 no-underline black'>login</Link>
          }
        </div>
      </div>
    )
  }

}

export default withRouter(Header)
