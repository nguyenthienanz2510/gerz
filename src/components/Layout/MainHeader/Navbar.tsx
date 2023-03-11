import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import path from 'src/constant/path'

export default function Navbar() {
  const { t } = useTranslation(['common'])
  const dataNavbar = useMemo(
    () => [
      {
        name: t('common:home'),
        slug: path.home
      },
      {
        name: t('common:about'),
        slug: path.about
      },
      {
        name: t('common:contact'),
        slug: path.contact
      },
      {
        name: t('common:faq'),
        slug: path.faq
      }
    ],
    [t]
  )
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
