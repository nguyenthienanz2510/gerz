import { NavLink } from 'react-router-dom'

const dataNavbar = [
  {
    name: 'Home',
    slug: '/'
  },
  {
    name: 'Shop',
    slug: '/shop'
  },
  {
    name: 'About',
    slug: '/about'
  },
  {
    name: 'Contact',
    slug: '/contact'
  }
]

export default function Navbar() {
  return (
    <div className='text-color-text-light'>
      {dataNavbar.map((item) => (
        <NavLink
          className={({ isActive }) =>
            (isActive ? 'nav-link-hover-effect--active' : undefined) + ' nav-link-hover-effect mr-12 text-12 uppercase'
          }
          key={item.slug}
          to={item.slug}
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  )
}
