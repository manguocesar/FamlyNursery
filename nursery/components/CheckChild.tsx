import { ChildrenInfo } from '@/types/types'
import React from 'react'
import styles from "./child.module.css";

export default function CheckChild(child: ChildrenInfo) {

    const CheckChild = async () => {

      console.log("hey");
      

      // fetch('https://app.famly.co/api/v2/children/<childId>/checkins', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(child.child),
      // })


    }


  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div className={styles.checkChild} onClick={()=> CheckChild}>Check Child</div>
      <div>{child.child.childId}</div>
    </div>
  )
}
