'use client'
import websocketService from '../service/web-socket-service/web-socket-service'
import React, { useEffect } from 'react'
import { accountDetailStore, logInStore } from '../store'
import { useRouter } from 'next/navigation'
import { HomeTab } from '@/index'

export default function HomePage() {
  // ACOUNT MASTER DETAILS
  const { firstName, lastName, accountId } = accountDetailStore()

  // AUTH TOKEN DETAILS
  const { token } = logInStore()

  // SAVE STORED TOKEN
  const storedState = localStorage.getItem('logInStore')
  const tokenStored = storedState && JSON.parse(storedState)

  // ROUTER
  const router = useRouter()

  // TRIGGER WEB SOCKET SERVICES
  useEffect(() => {
    websocketService.setCurrentLoggedInUser(accountId)
  }, [accountId])

  // VALIDATE TOKEN VALIDATION
  useEffect(() => {
    if (!token || !tokenStored) {
      router.push('/login')
    }
  }, [token])

  return <HomeTab />
}
