import { ChildrenInfo } from '@/types/children'
import React from 'react'
import styles from "./child.module.css";
import { format } from 'date-fns';
import { checkInChild, checkOutChild } from '@/actions/children';


export default function CheckChild(child: ChildrenInfo) {

  const now = format(Date(), "HH:mm")
  const [time, setTime] = React.useState<string>(now)



  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className={styles.checkChild} onClick={() => checkInChild(child?.child.childId, time)}>Check In Child at
        <input value={time} onChange={(ev) => { setTime(ev.target.value) }} aria-label="Time" type="time" />
      </div>
      <div className={styles.checkChild} onClick={() => checkOutChild(child?.child.childId)}>Check Out Child now</div>
    </div>
  )
}
