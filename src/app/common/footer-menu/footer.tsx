import React from 'react'
import {
  FavoriteMenuIcon,
  HomeIconReact,
  MessageIcon,
  NoticationIcon,
  ProfileIcon,
} from '../icons'

import './footer.css'
import { useRouter } from 'next/navigation'

export const Footer = () => {
  // ROUTER
  const router = useRouter()

  return (
    <div className='footer'>
      <FavoriteMenuIcon onClick={() => router.push('/favorites')} />
      <NoticationIcon onClick={() => console.log('OPEN NOTIFICATION SCREEN')} />
      <HomeIconReact onClick={() => router.push('/home')} />
      <MessageIcon onClick={() => console.log('OPEN MESSSAGES SCREEN')} />
      <ProfileIcon onClick={() => router.push('/profile')} />
    </div>
  )
}
