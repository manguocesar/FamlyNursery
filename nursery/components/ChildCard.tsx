import { checkInChild, checkOutChild } from '@/actions/children';
import React, { useState } from 'react';
import { format } from 'date-fns';
import ChildIntro from './ChildIntro';
import ChildInfo from './ChildInfo';
import { Child as ChildType } from '@/types/children';

export default function Child({ child }: { child: ChildType }) {
  const now = format(Date(), 'HH:mm');
  const [time, setTime] = useState<string>(now);

  return (
    <div
      key={child.childId}
      className="m-3 flex justify-around rounded-lg border-2 p-3"
    >
      <ChildIntro child={child} />
      <ChildInfo child={child} />

      <div className="">
        {child.checkedIn ? (
          <button
            className="m-3 rounded-lg border-b-0 border-r-2 bg-white p-3"
            onClick={() => {
              checkOutChild(child.childId);
            }}
          >
            Check Out Child now at {time}
          </button>
        ) : (
          <div className="flex flex-col items-center">
            <button
              className="m-3 rounded-lg border-b-0 border-r-2 bg-white p-3"
              onClick={() => {
                checkInChild(child.childId, time);
              }}
            >
              Check In Child at
            </button>
            <input
              value={time}
              onChange={ev => {
                setTime(ev.target.value);
              }}
              aria-label="Time"
              type="time"
            />
          </div>
        )}
      </div>
    </div>
  );
}
