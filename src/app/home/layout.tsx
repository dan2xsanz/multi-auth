'use client'
import { Spin } from 'antd'
import { Footer } from '../common'
import { HeaderMenu } from '../common/header-menu'
import { logInStore, useStore } from '../store'
import './home.css'
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading } = useStore()
  const { token } = logInStore()

  return (
    <div className='main-background'>
      {isLoading && (
        <div className='overlay'>
          <Spin size='large' />
        </div>
      )}
      <div className={`main-container`}>
        <HeaderMenu />
        {token && children}
        <Footer />
      </div>
    </div>
  )
}
