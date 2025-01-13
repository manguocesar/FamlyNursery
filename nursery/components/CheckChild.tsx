import { ChildrenInfo } from '@/types/types'
import React from 'react'
import styles from "./child.module.css";

export default function CheckChild(child: ChildrenInfo) {

  const checkInChild = async (childId: string) => {
    const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN

    try {
      let res = await fetch(`https://app.famly.co/api/v2/children/${childId}/checkins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken,
          pickupTime: "23:00"
        },)
      })
      let data = await res.json()
    } catch (error) {
      console.log(error)
    }
  }

  const checkOutChild = async (childId: string) => {
    const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN
    try {
      let res = await fetch(`https://app.famly.co/api/v2/children/${childId}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken,
        },)
      })
      let data = await res.json()
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className={styles.checkChild} onClick={() => checkInChild(child?.child.childId)}>Check In Child at 16:00</div>
      <div className={styles.checkChild} onClick={() => checkOutChild(child?.child.childId)}>Check Out Child now</div>
    </div>
  )
}
