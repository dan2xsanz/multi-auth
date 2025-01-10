'use client'
import { Spin } from 'antd'
import { Footer } from '../common'
import { HeaderMenu } from '../common/header-menu'
import { useStore } from '../store'
import './home.css'
export default function HomeLayout({
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
