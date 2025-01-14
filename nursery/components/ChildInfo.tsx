import React from 'react'
import { ChildrenInfo } from '../types/children'
import { format } from 'date-fns';


export default function ChildInfo(child: ChildrenInfo) {

  let date = format(child.child.checkinTime, "eeee dd LLL")
  let time = format(child.child.checkinTime, "HH:mm")

  return (
      <div className="flex flex-col items-center">
        <h2 className=' font-bold'>Child Info:</h2>
        <div>Gender: {child.child.gender === 1 ? "Boy" : "Girl"}</div>
        <div className='text-center'>Checking date: {date}</div>
        <div className='text-center'>Checking time: {time}</div>
      </div>
  )
}
