import React from 'react'
import styles from "./child.module.css";
import { ChildrenInfo } from '../types/types'


export default function ChildInfo(child:ChildrenInfo) {
  return (
    <div className={styles.childInfo}>
            <h2>Child Info:</h2>
            {child.child.gender === 1 ?<p>Boy</p> :<p>Girl</p>}
            <p style={{textAlign: 'center'}}>{child.child.checkinTime}</p>
          
          </div>
  )
}
