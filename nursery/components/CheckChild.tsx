import { ChildrenInfo } from '@/types/types'
import React from 'react'
import styles from "./child.module.css";

export default function CheckChild(child: ChildrenInfo) {

  const checkChild = async (childId: string) => {

    const accessToken = process.env.ACCESS_TOKEN
    try {
      let res = await fetch(`https://app.famly.co/api/v2/children/${childId}/checkins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken,
          pickupTime: "16:00"
        },)
      })
      let data = await res.json()
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className={styles.checkChild} onClick={() => checkChild(child?.child.childId)}>Check Child</div>
      <div>{child.child.childId}</div>
    </div>
  )
}
