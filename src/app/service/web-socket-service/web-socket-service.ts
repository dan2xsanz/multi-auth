
import { openNotification, openSuccessNotification } from '@/index'
import { REQUEST_URL } from '@/properties'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { NotificationInterface } from './web-socket-service-interface'

class WebSocketService {
  private client: Client
  private curentLoggedInUserId: number | undefined

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://52.62.0.134:8080/ws',
      webSocketFactory: () => new SockJS(`${REQUEST_URL}/ws`),
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str)
      },
    })

    this.client.onConnect = () => {
      console.log('Connected to WebSocket')
      this.client.subscribe('/topic/notifications', (message: any) => {
        // TESTING PURPOSES
        // console.log('Received message: ', message.body)
        // console.log(JSON.parse(message.body)['accountMasterId'])
        if (
          this.curentLoggedInUserId ===
            JSON.parse(message.body)['receiverId'] &&
          this.curentLoggedInUserId !== JSON.parse(message.body)['senderId']
        ) {
          openNotification({
            description: JSON.parse(message.body)['content'],
            placement: 'bottomRight',
          })
        }
      })
    }

    this.client.activate()
  }

  // SET CURRENT LOGGED IN USER
  setCurrentLoggedInUser(accountMasterId: number | undefined) {
    this.curentLoggedInUserId = accountMasterId
  }

  // SENT FAVORITE NOTIFICATION
  sendNotificationMessage(properties: NotificationInterface) {
    const { subject, notificationTopic, receiverId, message, senderId } =
      properties
    this.client.publish({
      destination: '/app/notification',
      body: JSON.stringify({
        content: message,
        subject: subject,
        senderId: senderId,
        receiverId: receiverId,
        notificationTopic: notificationTopic,
      }),
    })
  }
}

const webSocketServiceInstance = new WebSocketService()
export default webSocketServiceInstance
