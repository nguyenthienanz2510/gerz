import { faKey, faMoneyCheckDollar, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import path from 'src/constant/path'
import { AppContext } from 'src/context/app.context'
import { getAvatarURL } from 'src/utils/utils'

export default function UserSideNav() {
  const { userProfile } = useContext(AppContext)
  const { t } = useTranslation(['profile'])
  return (
    <div>
      <div>
        <Link to={path.profile}>
          <div className='flex flex-col items-center justify-center gap-3 sm:items-start'>
            <div className='inline-block overflow-hidden rounded-full border'>
              <img
                src={getAvatarURL(userProfile?.avatar)}
                alt='Avatar'
                title='Avatar'
                className='h-20 w-20 object-cover'
              />
            </div>
            <span className='font-semibold capitalize'>{userProfile?.name || userProfile?.email}</span>
          </div>
        </Link>
      </div>
      <ul className='mt-10 space-y-5'>
        <li>
          <NavLink to={path.profile} className={({ isActive }) => (isActive ? 'text-color-primary' : undefined)}>
            <div className='flex items-center justify-start'>
              <FontAwesomeIcon icon={faUser} />
              <span className='ml-3 capitalize'>{t('profile:myProfile')}</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={path.historyPurchase}
            className={({ isActive }) => (isActive ? 'text-color-primary' : undefined)}
          >
            <div className='flex items-center justify-start'>
              <FontAwesomeIcon icon={faMoneyCheckDollar} />
              <span className='ml-3 capitalize'>{t('profile:history')}</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to={path.changePassword} className={({ isActive }) => (isActive ? 'text-color-primary' : undefined)}>
            <div className='flex items-center justify-start'>
              <FontAwesomeIcon icon={faKey} />
              <span className='ml-3 capitalize'>{t('profile:changePassword')}</span>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
