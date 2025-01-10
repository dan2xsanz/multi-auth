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

  // SAVE STORED TOKEN
  const storedState = localStorage.getItem('logInStore')
  const tokenStored = storedState && JSON.parse(storedState)

  // VALIDATE TOKEN VALIDATION
  useEffect(() => {
    if (!token || !tokenStored) {
      router.push('/login')
    }
  }, [token])

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
