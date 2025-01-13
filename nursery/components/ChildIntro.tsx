import React from 'react'
import styles from "./child.module.css";
import { ChildrenInfo } from '../types/types'


export default function ChildIntro(child:ChildrenInfo) {
  
  return (
    <div className={styles.childIntro}>
      <h2 style={{textAlign: 'center'}}>{child.child.name?.fullName}</h2>
      <div>
        Child Image
      </div>
    </div>
  )
}
