'use client'
import websocketService from '../service/web-socket-service/web-socket-service'
import React, { Fragment, useEffect, useState } from 'react'
import { accountDetailStore, logInStore } from '../store'
import { useRouter } from 'next/navigation'
import {
  NotificationTab,
  FavoritesTab,
  ProfileTab,
  HomeTab,
  SnzLogo,
  CommonDrawer,
  MenuIconReact,
  HomeIconReact,
  FavoriteIcon,
  NoticationIcon,
  MessageIcon,
  ProfileIcon,
  FavoriteMenuIcon,
  Footer,
} from '@/index'
import { MessagesTab } from './components/messages-tab/messages-tab'
import { Dropdown, MenuProps, message } from 'antd'

export default function HomePage() {
  // ACOUNT MASTER DETAILS
  const { firstName, lastName, accountId } = accountDetailStore()

  // AUTH TOKEN DETAILS
  const { token } = logInStore()

  // SAVE STORED TOKEN
  const storedState = localStorage.getItem('logInStore')
  const tokenStored = storedState && JSON.parse(storedState)

  // HEADER BUTTON TAGS
  const [headerButton, setHeaderButton] = useState<number>(1)

  // OPEN NOTIFIICATION DRAWER
  const [openNotification, setOpenNotification] = useState<boolean>(false)

  // OPEN NOTIFIICATION DRAWER
  const [openMessages, setOpenMessages] = useState<boolean>(false)

  // ROUTER
  const router = useRouter()

  // REDIRECTS TO LOGIN SCREEN
  const redirectToLoginScreen = () => {
    router.push('/login')
  }

  // TRIGGER WEB SOCKET SERVICES
  useEffect(() => {
    websocketService.setCurrentLoggedInUser(accountId)
  }, [accountId, headerButton])

  // VALIDATE TOKEN VALIDATION
  useEffect(() => {
    if (!token || !tokenStored) {
      redirectToLoginScreen()
    }
  }, [token])

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case '1':
        setHeaderButton(1)
        break
      case '2':
        setHeaderButton(2)
        break
      case '3':
        setOpenNotification(true)
        break
      case '4':
        setOpenMessages(true)
        break
      case '5':
        setHeaderButton(3)
        break
      case '6':
        redirectToLoginScreen()
        break
    }
  }

  const items: MenuProps['items'] = [
    {
      label: 'Home',
      key: '1',
    },
    {
      label: 'Favorites',
      key: '2',
    },
    {
      label: 'Notication',
      key: '3',
    },
    {
      label: 'Messages',
      key: '4',
    },
    {
      label: `${firstName} ${lastName}`,
      key: '5',
    },
    {
      label: 'Logout',
      key: '6',
    },
  ]

  return (
    <Fragment>
      {token && (
        <Fragment>
          <div className='header-container'>
            <div className='header-menu-container'>
              <SnzLogo />
              <div className='header-icon-container'>
                <div className='header-icon' onClick={() => setHeaderButton(1)}>
                  Home
                </div>
                <div className='header-icon' onClick={() => setHeaderButton(2)}>
                  Favorites
                </div>
                <div
                  className='header-icon'
                  onClick={() => setOpenNotification(true)}
                >
                  Notification
                </div>
                <div
                  className='header-icon'
                  onClick={() => setOpenMessages(true)}
                >
                  Messages
                </div>
                <div
                  className='header-icon'
                  onClick={() => setHeaderButton(3)}
                >{`Hi, ${firstName} ${lastName}`}</div>
                <div className='header-icon' onClick={redirectToLoginScreen}>
                  Logout
                </div>
              </div>
              {/* <div className='menu-icon-container'>
                <Dropdown menu={{ items, onClick }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <MenuIconReact />
                  </a>
                </Dropdown>
              </div> */}
            </div>
          </div>
          <div className='body-container'>
            {headerButton === 1 && <HomeTab />}
            {headerButton === 2 && <FavoritesTab />}
            {headerButton === 3 && <ProfileTab />}
          </div>
          {/* FOOTER CONTAINER */}
          <Footer />
          {/* NOTIFICATION DRAWER */}
          <CommonDrawer
            openDrawer={openNotification}
            setOpenDrawer={setOpenNotification}
          >
            <NotificationTab />
          </CommonDrawer>
          {/* MESSAGES DRAWER */}
          <CommonDrawer
            openDrawer={openMessages}
            setOpenDrawer={setOpenMessages}
          >
            <MessagesTab />
          </CommonDrawer>
        </Fragment>
      )}
    </Fragment>
  )
}
