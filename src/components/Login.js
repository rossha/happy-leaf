import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'
import { graphql, gql, compose } from 'react-apollo'
import '../styles/login.css'
import logo from '../images/icons/logo.svg'

class Login extends Component {

  state = {
    login: true, // switch between login and sign-up
    email: '',
    password: '',
    name: ''
  }

  render() {
    const userId = localStorage.getItem(GC_USER_ID)
    return (
      <div className="login">
        { userId &&
          <Redirect to="/admin"/>
        }
        <h4 className='login__header'>{this.state.login ? 'Sign In' : 'Sign Up'}</h4>
        <div className="login__alert">
          <img alt="logo" className="login__alert__logo" src={logo} />
          <div className="login__alert__message">
            This App is in Demo Mode. Test it using <span className="lowercase"><span className="login__alert-span">U:</span> Admin <span className="login__alert-span">P:</span> Password</span>
          </div>
          <div className="login__alert__message--mobile">
            <div>This App is in Demo Mode. Test it using:</div>
            <div className="lowercase"><span className="login__alert-span">U:</span> Admin <span className="login__alert-span">P:</span> Password</div>
          </div>
        </div>
        <div className='login__form'>
          {!this.state.login &&
          <input
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
            type='text'
            className='login__form__input'
            placeholder='Your name'
          />}
          <input
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            type='text'
            className='login__form__input'
            placeholder='Your email address'
          />
          <input
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            type='password'
            className='login__form__input'
            placeholder='Choose a safe password'
          />
        </div>
        <div className='flex mt3'>
          <div
            className='button'
            onClick={() => this._confirm()}
          >
            {this.state.login ? 'login' : 'create account' }
          </div>
          <div
            className='button'
            onClick={() => this.setState({ login: !this.state.login })}
          >
            {this.state.login ? 'need to create an account?' : 'already have an account?'}
          </div>
        </div>
      </div>
    )
  }

  _confirm = async () => {
    const { name, email, password } = this.state
    if (this.state.login) {
      const result = await this.props.signinUserMutation({
        variables: {
          email,
          password
        }
      })
      const id = result.data.signinUser.user.id
      const token = result.data.signinUser.token
      this._saveUserData(id, token)
    } else {
      const result = await this.props.createUserMutation({
        variables: {
          name,
          email,
          password
        }
      })
      const id = result.data.signinUser.user.id
      const token = result.data.signinUser.token
      this._saveUserData(id, token)
    }
    this.props.history.push(`/admin`)
  }

  _saveUserData = (id, token) => {
    localStorage.setItem(GC_USER_ID, id)
    localStorage.setItem(GC_AUTH_TOKEN, token)
  }

}

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
    createUser(
      name: $name,
      authProvider: {
        email: {
          email: $email,
          password: $password
        }
      }
    ) {
      id
    }

    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`

const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
)(Login)
