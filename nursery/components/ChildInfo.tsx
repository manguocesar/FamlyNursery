import React from 'react'
import styles from "./child.module.css";
import { ChildrenInfo } from '../types/children'
import {format} from 'date-fns';


export default function ChildInfo(child: ChildrenInfo) {

  let date = format(child.child.checkinTime, "eeee dd LLL")
  let time = format(child.child.checkinTime, "HH:mm")

  return (
    <div className={styles.childInfo}>
      <h2>Child Info:</h2>
      <div>Gender: {child.child.gender === 1 ? "Boy" : "Girl"}</div>
      <div style={{ textAlign: 'center' }}>Checking date: {date}</div>
      <div style={{ textAlign: 'center' }}>Checking time: {time}</div>
    </div>
  )
}
