import './index.css'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const removeCookies = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-menu">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="">
        <li>
          <Link to="/">
            <button type="button">Home</button>
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <button type="button">Jobs</button>
          </Link>
        </li>
      </ul>
      <li>
        <Link to="/login">
          <button type="button" onClick={removeCookies}>
            Logout
          </button>
        </Link>
      </li>
    </nav>
  )
}
export default withRouter(Header)
