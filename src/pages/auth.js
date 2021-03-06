import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { Image } from 'react-bootstrap'

import FormLogin from '../components/formLogin'
import FormRegister from '../components/formRegister'

class Auth extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: this.isLoggedIn()
    }
    if(this.isLoggedIn())
      props.history.push('/')
  }

  isLoggedIn(){
    return window.localStorage.getItem('token')
  }

  render () {
    return (
      <div className='app'>
        <div className='main'>
          <div className='left-bg'>
            <div className='text-margin'>
              <div>
                <h1>Book is a window<br />to the world</h1>
              </div>
              <div>
                <h6>Photo by Mark Pan4ratte on Unsplash</h6>
              </div>
            </div>
          </div>
        </div>
        <div className='right-form'>
          <Image src={require('../bookshelf.svg')} style={{width:'100px', height:'100px'}}/>
          <Route
            path={'/login'}
            render={() => {
              return (
                this.state.loggedIn ? this.props.history.push('/')
                  : <div>
                      <FormLogin />
                    </div>
              )
            }}
          />
          <Route
            path={'/register'}
            render={() => {
              return (
                  <div>
                    <FormRegister />
                  </div>
              )
            }}
          />
          <br />
          <div className="container">
            <h6>By signing up, you agree to Book's
              <br />Terms and Conditions & Privacy Policy
            </h6>
          </div>
        </div>
      </div>
    )
  }
}

export default Auth
