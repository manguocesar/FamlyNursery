import React from 'react'
import styles from "./child.module.css";
import { ChildrenInfo } from '../types/types'


export default function ChildInfo(child:ChildrenInfo) {
  return (
    <div className={styles.childInfo}>
            Child Info:
            <p>{child.child.gender}</p>
            <p>{child.child.checkinTime}</p>
            <p>{child.child.hasVacation}</p>
            <p>{child.child.isSick}</p>
            <p>{child.child.isAbsent}</p>
            <p>{child.child.onBus}</p>
          </div>
  )
}
