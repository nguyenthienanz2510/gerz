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
    <div>
      {dataNavbar.map((item) => (
        <NavLink
          className={({ isActive }) => (isActive ? 'text-color-primary' : undefined) + ' px-2'}
          key={item.slug}
          to={item.slug}
        >
          {item.name}

        </NavLink>
      ))}
    </div>
  )
}
