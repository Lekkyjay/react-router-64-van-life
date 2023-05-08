import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
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
      </nav>
    </header>
  )
}
