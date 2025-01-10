'use client'
import { Spin } from 'antd'
import { Footer } from '../common'
import { HeaderMenu } from '../common/header-menu'
import './profile.css'
import { logInStore, useStore } from '../store'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect } from 'react'
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading } = useStore()

  // AUTH TOKEN DETAILS
  const { token } = logInStore()

  // ROUTER
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Access localStorage safely in the browser
      const storedState = localStorage.getItem('logInStore')
      const parsedState = storedState && JSON.parse(storedState)

      // Redirect if no token or invalid token
      if (!parsedState?.token) {
        router.push('/login')
      }
    }
  }, [router])

  return (
    <div className='main-background'>
      {isLoading && (
        <div className='overlay'>
          <Spin size='large' />
        </div>
      )}
      <div className={`main-container`}>
        {token && (
          <Fragment>
            <HeaderMenu />
            {children}
            <Footer />
          </Fragment>
        )}
      </div>
    </div>
  )
}
