'use client'
import { Spin } from 'antd'
import { Footer } from '../common'
import { HeaderMenu } from '../common/header-menu'
import { useStore } from '../store'
import './favorites.css'
export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading } = useStore()

  return (
    <div className='main-background'>
      <div className={`main-container`}>
        {isLoading && (
          <div className='overlay'>
            <Spin size='large' />
          </div>
        )}
        <HeaderMenu />
        {children}
        <Footer />
      </div>
    </div>
  )
}
