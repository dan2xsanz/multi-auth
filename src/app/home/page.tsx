'use client'
import websocketService from '../service/web-socket-service/web-socket-service'
import React, { useEffect } from 'react'
import { accountDetailStore } from '../store'
import { HomeTab } from '@/index'

export default function HomePage() {
  // ACOUNT MASTER DETAILS
  const { accountId } = accountDetailStore()

  // TRIGGER WEB SOCKET SERVICES
  useEffect(() => {
    websocketService.setCurrentLoggedInUser(accountId)
  }, [accountId])

  return <HomeTab />
}
