import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import path from 'src/constant/path'

export default function NavbarMobile() {
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
      <ul>
        {dataNavbar.map((item) => (
          <li key={item.slug}>
            <NavLink
              className={({ isActive }) =>
                (isActive ? 'text-color-primary' : undefined) +
                ' container mx-auto mr-12 block border-b-2 border-b-color-black py-4 uppercase'
              }
              to={item.slug}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
