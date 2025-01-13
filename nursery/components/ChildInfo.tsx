import React from 'react'
import styles from "./child.module.css";
import { ChildrenInfo } from '../types/types'


export default function ChildInfo(child:ChildrenInfo) {

  let date = new Date(child.child.checkinTime);

  return (
    <div className={styles.childInfo}>
            <h2>Child Info:</h2>
            {child.child.gender === 1 ?<div>Gender: Boy</div> :<div>Gender: Girl</div>}
            <div style={{textAlign: 'center'}}>Checking date: {date.toLocaleDateString()}</div>
            <div style={{textAlign: 'center'}}>Checking time: {date.toLocaleTimeString()}</div>
          
          </div>
  )
}
