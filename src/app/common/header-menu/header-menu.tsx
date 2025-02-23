import React, { useState } from 'react'
import { SnzLogo } from '../logo'
import { CommonDrawer } from '../drawer'
import { NotificationTab } from '@/app'
import { MessagesTab } from '@/app/home/components/messages-tab'
import { accountDetailStore, logInStore } from '@/app/store'
import { useRouter } from 'next/navigation'

export const HeaderMenu = () => {
  // ROUTER
  const router = useRouter()

  // AUTH TOKEN DETAILS
  const { token } = logInStore()

  // ACOUNT MASTER DETAILS
  const { firstName, lastName } = accountDetailStore()

  // OPEN NOTIFIICATION DRAWER
  const [openNotification, setOpenNotification] = useState<boolean>(false)

  // OPEN NOTIFIICATION DRAWER
  const [openMessages, setOpenMessages] = useState<boolean>(false)

  return (
    <div className='header-container'>
      <div className='header-menu-container'>
        <SnzLogo />

        <div className='header-icon-container'>
          {token && (
            <div className='header-icon-container'>
              <div className='header-icon' onClick={() => router.push('/home')}>
                Home
              </div>
              <div
                className='header-icon'
                onClick={() => router.push('/favorites')}
              >
                Favorites
              </div>
              <div
                className='header-icon'
                onClick={() => setOpenNotification(true)}
              >
                Notification
              </div>
              {/* <div
                className='header-icon'
                onClick={() => setOpenMessages(true)}
              >
                Messages
              </div> */}
              <div className='header-icon' onClick={() => router.push('/cart')}>
                Cart
              </div>
              <div
                className='header-icon'
                onClick={() => router.push('/profile')}
              >{`Hi, ${firstName} ${lastName}`}</div>
              <div
                className='header-icon'
                onClick={() => router.push('/login')}
              >
                Logout
              </div>
            </div>
          )}
        </div>

        {!token && (
          <div className='header-login-icon-container'>
            <div className='header-icon' onClick={() => router.push('/login')}>
              Login/Sign Up
            </div>
          </div>
        )}
      </div>
      {/* NOTIFICATION DRAWER */}
      <CommonDrawer
        openDrawer={openNotification}
        setOpenDrawer={setOpenNotification}
      >
        <NotificationTab />
      </CommonDrawer>
      {/* MESSAGES DRAWER */}
      <CommonDrawer openDrawer={openMessages} setOpenDrawer={setOpenMessages}>
        <MessagesTab />
      </CommonDrawer>
    </div>
  )
}
