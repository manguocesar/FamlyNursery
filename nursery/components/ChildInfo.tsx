import React from 'react';
import { ChildrenInfo } from '../types/children';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';

const fetchChildren = async () => {
  try {
    const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
    const groupId = '86413ecf-01a1-44da-ba73-1aeda212a196';
    const institutionId = 'dc4bd858-9e9c-4df7-9386-0d91e42280eb';
    const URL = `https://app.famly.co/api/daycare/tablet/group?accessToken=${accessToken}&groupId=${groupId}&institutionId=${institutionId}`;

    const res = await fetch(URL);
    const { children } = await res.json();
    return children;
  } catch (error) {
    console.log(error);
  }
};

export default function ChildInfo(child: ChildrenInfo) {
  let date = format(child.child.checkinTime, 'eeee dd LLL');
  let time = format(child.child.checkinTime, 'HH:mm');

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: fetchChildren,
  //   staleTime: 10000,
  // });

  // if (isLoading) return <p> Loading...</p>;

  // if (error) return <p> Error occured: {error.message}</p>;

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold">Child Info:</h2>
      <div>Gender: {child.child.gender === 1 ? 'Boy' : 'Girl'}</div>
      <div className="mt-3 text-center">Last check-in: {date}</div>
      <div className="text-center">{time}</div>
      {child?.child.checkedIn ? (
        <div className="mt-3 font-bold text-green-600">Checked In</div>
      ) : (
        <div className="mt-3 font-bold text-red-500">Checked Out</div>
      )}
    </div>
  );
}
