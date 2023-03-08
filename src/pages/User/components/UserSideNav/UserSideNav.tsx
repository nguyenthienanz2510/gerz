import { faKey, faMoneyCheckDollar, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import path from 'src/constant/path'
import { AppContext } from 'src/context/app.context'

export default function UserSideNav() {
  const { userProfile } = useContext(AppContext)
  return (
    <div>
      <div>
        <Link to={path.profile}>
          <div className='flex flex-wrap items-start justify-start gap-3'>
            <div className='overflow-hidden rounded-full border'>
              <img
                src='/images/avatar-the-boss-baby.png'
                alt='Avatar'
                title='Avatar'
                className='h-20 w-20 object-cover'
              />
            </div>
            <span className='font-semibold capitalize'>{userProfile?.email}</span>
          </div>
        </Link>
      </div>
      <ul className='mt-10 space-y-5'>
        <li>
          <NavLink to={path.profile} className={({ isActive }) => (isActive ? 'text-color-primary' : undefined)}>
            <div className='flex items-center justify-start'>
              <FontAwesomeIcon icon={faUser} />
              <span className='ml-3 capitalize'>My profile</span>
            </div>
          </NavLink>
        </li>
        <li>
          <Link to={path.historyPurchase}>
            <div className='flex items-center justify-start'>
              <FontAwesomeIcon icon={faMoneyCheckDollar} />
              <span className='ml-3 capitalize'>History</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to={path.changePassword}>
            <div className='flex items-center justify-start'>
              <FontAwesomeIcon icon={faKey} />
              <span className='ml-3 capitalize'>Change password</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  )
}
