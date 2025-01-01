import React from 'react'
import {
  FavoriteMenuIcon,
  HomeIconReact,
  MessageIcon,
  NoticationIcon,
  ProfileIcon,
} from '../icons'

import './footer.css'

export const Footer = () => {
  return (
    <div className='footer'>
      <FavoriteMenuIcon />
      <NoticationIcon />
      <HomeIconReact />
      <MessageIcon />
      <ProfileIcon />
    </div>
  )
}
