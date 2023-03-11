import { NavLink } from 'react-router-dom'
import path from 'src/constant/path'

const dataNavbar = [
  {
    name: 'Home',
    slug: path.home
  },
  {
    name: 'About',
    slug: path.about
  },
  {
    name: 'Contact',
    slug: path.contact
  },
  {
    name: 'FAQ',
    slug: path.faq
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
