import React from 'react'
import styles from "./child.module.css";
import { ChildrenInfo } from '../types/types'


export default function ChildInfo(child:ChildrenInfo) {

  let date = new Date(child.child.checkinTime);

  return (
    <div className={styles.childInfo}>
            <h2>Child Info:</h2>
            {child.child.gender === 1 ?<p>Gender: Boy</p> :<p>Gender: Girl</p>}
            <p style={{textAlign: 'center'}}>Checking date: {date.toLocaleDateString()}</p>
            <p style={{textAlign: 'center'}}>Checking time: {date.toLocaleTimeString()}</p>
          
          </div>
  )
}
