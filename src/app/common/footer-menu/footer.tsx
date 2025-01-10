import React, { Fragment } from 'react'
import {
  FavoriteMenuIcon,
  HomeIconReact,
  MessageIcon,
  NoticationIcon,
  ProfileIcon,
} from '../icons'

import './footer.css'
import { useRouter } from 'next/navigation'
import { logInStore } from '@/app/store'

export const Footer = () => {
  // ROUTER
  const router = useRouter()

  // AUTH TOKEN DETAILS
  const { token } = logInStore()

  return (
    <Fragment>
      {token && (
        <div className='footer'>
          <FavoriteMenuIcon onClick={() => router.push('/favorites')} />
          <NoticationIcon
            onClick={() => console.log('OPEN NOTIFICATION SCREEN')}
          />
          <HomeIconReact onClick={() => router.push('/home')} />
          <MessageIcon onClick={() => console.log('OPEN MESSSAGES SCREEN')} />
          <ProfileIcon onClick={() => router.push('/profile')} />
        </div>
      )}
    </Fragment>
  )
}
