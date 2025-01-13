import React from 'react'
import styles from "./child.module.css";
import { ChildrenInfo } from '../types/types'
import Image from 'next/image';


export default function ChildIntro(child:ChildrenInfo) {
  
  return (
    <div className={styles.childIntro}>
      <h2 style={{textAlign: 'center'}}>{child.child.name?.fullName}</h2>
      <Image style={{borderRadius: '15px', margin: "10px"}} src="/famly.jpg" alt="child image" width={200} height={200} />
    </div>
  )
}
