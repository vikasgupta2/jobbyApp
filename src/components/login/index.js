import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: ''}

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  verifyUser = async event => {
    event.preventDefault()
    const {username, password} = this.state
    console.log(username)
    console.log(password)
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data)
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      document.getElementById('error-msg').textContent = data.error_msg
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-login-container">
        <form className="login-container" onSubmit={this.verifyUser}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <br />
          <label htmlFor="username">USERNAME</label>
          <br />
          <input
            type="text"
            onChange={this.getUsername}
            placeholder="Username"
            id="username"
          />
          <br />
          <label htmlFor="password">PASSWORD</label>
          <br />
          <input
            type="password"
            onChange={this.getPassword}
            placeholder="Password"
            id="password"
          />
          <br />

          <button type="submit">Login</button>
          <p id="error-msg" />
        </form>
      </div>
    )
  }
}

export default Login
