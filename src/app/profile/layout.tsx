'use client'
import { Spin } from 'antd'
import { Footer } from '../common'
import { HeaderMenu } from '../common/header-menu'
import './profile.css'
import { useStore } from '../store'
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading } = useStore()

  return (
    <div className='main-background'>
      {isLoading && (
        <div className='overlay'>
          <Spin size='large' />
        </div>
      )}
      <div className={`main-container`}>
        <HeaderMenu />
        {children}
        <Footer />
      </div>
    </div>
  )
}
