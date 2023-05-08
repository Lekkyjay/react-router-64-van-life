import { NavLink, Outlet } from 'react-router-dom'

export default function HostLayout() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
  }

  const navLinkStyles = ({ isActive }: { isActive: Boolean }) => isActive ? activeStyles : {}

  return (
    <>
      <nav className="host-nav">
        <NavLink to="." end style={navLinkStyles}>Dashboard</NavLink>
        <NavLink to="income" style={navLinkStyles}>Income</NavLink>        
        <NavLink to="vans" style={navLinkStyles}>Vans</NavLink>
        <NavLink to="reviews" style={navLinkStyles}>Reviews</NavLink>
      </nav>
      <Outlet />
    </>
  )
}
