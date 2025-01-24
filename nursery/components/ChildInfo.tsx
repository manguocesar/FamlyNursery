import React from 'react';
import { ChildrenInfo } from '../types/children';
import { format } from 'date-fns';

export default function ChildInfo(child: ChildrenInfo) {
  const date = format(child.child.checkinTime, 'eeee dd LLL');
  const time = format(child.child.checkinTime, 'HH:mm');

  return (
    <div className="flex flex-col items-center w-3/6">
      <h2 className="font-bold">Child Info:</h2>
      <div>{child.child.gender === 1 ? 'Boy' : 'Girl'}</div>
      <div className="mt-3 text-center">Last check-in:</div>
      <div className="mt-3 text-center">{date}</div>
      <div className="text-center">{time}</div>
      {child?.child.checkedIn ? (
        <div className="mt-3 font-bold text-green-600">Checked In</div>
      ) : (
        <div className="mt-3 font-bold text-red-500">Checked Out</div>
      )}
    </div>
  );
}
