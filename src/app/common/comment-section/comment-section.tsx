import { NotificationInterface } from '@/app/service/web-socket-service/web-socket-service-interface'
import webSocketServiceInstance from '@/app/service/web-socket-service/web-socket-service'
import { ProductListInterface } from '@/app/home/components/home-tab/data'
import { addCommentsOperation, getAllCommentsOperation } from './operation'
import { CommentSectionInterface } from './comment-section-interface'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { accountDetailStore, useStore } from '@/app/store'
import { UserOutlined } from '@ant-design/icons/lib/icons'
import { SentCommentIcon } from '../icons'
import { Avatar, Card } from 'antd'
import './comment-section.css'
import { WebSocketTopic } from '@/index'

interface CommentSectionProps {
  inputedValue: string
  style?: React.CSSProperties
  setInputtedValue: (data: string) => void
  productDetails: ProductListInterface | undefined
  productMasterId: number | undefined
}

export const CommentSection = (props: CommentSectionProps) => {
  // COMMENT SECTION PROPS
  const { inputedValue, productDetails, productMasterId, setInputtedValue } =
    props

  // LOADING SCREEN STORE
  const { setIsLoading } = useStore()

  // AUTO FOCUS FIELD
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // COMMENT SECTION ACCOUNT MASTER DETAILS
  const { firstName, lastName, accountId } = accountDetailStore()

  // COMMENT SECTION LIST STATE
  const [commentSectionList, setCommentSectionList] = useState<
    CommentSectionInterface[]
  >([])

  // ON ADD TO COMMENT SECTION LIST
  const addToCommentSection = (inputedValue: string) => {
    let commentSectionData: CommentSectionInterface = {
      accountMasterId: accountId,
      accountMasterName: `${firstName} ${lastName}`,
      comment: inputedValue,
      productMasterId: productMasterId,
      notifiedAccountMasterId: productDetails?.accountMasterId,
    }
    addCommentsOperation(
      setIsLoading,
      productMasterId,
      setInputtedValue,
      commentSectionData,
      commentSectionList,
      setCommentSectionList,
    )
    let notification: NotificationInterface = {
      senderId: accountId,
      subject: productDetails?.productName,
      notificationTopic: WebSocketTopic.Comment,
      receiverId: productDetails?.accountMasterId,
      message: `${firstName} ${lastName} Commented on your Product`,
    }
    webSocketServiceInstance.sendNotificationMessage(notification)
  }

  // AUTO FOCUS FIELD
  useEffect(() => {
    if (textareaRef.current && inputedValue === '') textareaRef.current.focus()
  }, [inputedValue])

  useEffect(() => {
    getAllCommentsOperation(
      setIsLoading,
      productMasterId,
      commentSectionList,
      setCommentSectionList,
    )
  }, [productMasterId])

  return (
    <Fragment>
      <Card className='comment-section-main-container'>
        {commentSectionList.length > 0 &&
          commentSectionList.map((data, index) => {
            return (
              <div key={index} className='avatar-account-details-container'>
                <Avatar icon={<UserOutlined />} />
                <div style={{ width: '380px' }}>
                  <div
                    style={{ fontWeight: 'bolder' }}
                  >{`${data.accountMasterName}`}</div>
                  <div>{`${data.comment}`}</div>
                </div>
              </div>
            )
          })}
        {commentSectionList.length === 0 && (
          <div className='no-comment-style'>No comments.</div>
        )}
      </Card>
      <div className='comment-input-field-container'>
        <textarea
          ref={textareaRef}
          value={inputedValue}
          placeholder='Write a comment'
          className='comment-input-field'
          onChange={(data) => {
            if (data) setInputtedValue(data.target.value.toString())
          }}
        />
        <SentCommentIcon
          onClick={() => {
            if (inputedValue) addToCommentSection(inputedValue)
          }}
        />
      </div>
    </Fragment>
  )
}
