'use client'
import { Spin } from 'antd'
import { Footer } from '../common'
import { HeaderMenu } from '../common/header-menu'
import { logInStore, useStore } from '../store'
import './favorites.css'
export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading } = useStore()
  const { token } = logInStore()

  return (
    <div className='main-background'>
      <div className={`main-container`}>
        {isLoading && (
          <div className='overlay'>
            <Spin size='large' />
          </div>
        )}
        <HeaderMenu />

        {token && children}
        <Footer />
      </div>
    </div>
  )
}
