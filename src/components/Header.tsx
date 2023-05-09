import { Link, NavLink } from 'react-router-dom'
import avatarIcon from '../assets/images/avatar-icon.png'

export default function Header() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
  }

  function fakeLogOut() {
    localStorage.removeItem('loggedin')
  }

  const navLinkStyles = ({ isActive }: { isActive: Boolean }) => isActive ? activeStyles : {}

  return (
    <header>
      <Link className="site-logo" to="/">#VanLife</Link>
      <nav>
        <NavLink to="/host" style={navLinkStyles}>
          Host
        </NavLink>
        <NavLink to="/about" style={navLinkStyles}>
          About
        </NavLink>
        <NavLink to="/vans" style={navLinkStyles}>
          Vans
        </NavLink>
        <Link to="login" className="login-link">
          <img src={avatarIcon} className="login-icon" />
        </Link>
        <button onClick={fakeLogOut}>X</button>
      </nav>
    </header>
  )
}
