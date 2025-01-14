import { ChildrenInfo } from '@/types/children'
import React from 'react'
import { format } from 'date-fns';
import { checkInChild, checkOutChild } from '@/actions/children';

export default function CheckChild(child: ChildrenInfo) {

  const now = format(Date(), "HH:mm")
  const [time, setTime] = React.useState<string>(now)

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <button className="rounded-lg border-b-0 border-r-2 m-3 p-3 bg-white"
        onClick={() => checkInChild(child?.child.childId, time)}>Check In Child at
        <input value={time} onChange={(ev) => { setTime(ev.target.value) }} aria-label="Time" type="time" />
      </button>
      <button className="rounded-lg border-b-0 border-r-2 m-3 p-3 bg-white"
       onClick={() => checkOutChild(child?.child.childId)}>Check Out Child now</button>
    </div>
  )
}
