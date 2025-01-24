'use client';

import dynamic from 'next/dynamic';
import { fetchChildren } from '@/actions/children';
import React, { useEffect, useState } from 'react';
import { Child as ChildType } from '@/types/children';
import { useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
const ChildIntro = dynamic(() => import('./ChildIntro'), { ssr: false })
const ChildInfo = dynamic(() => import('./ChildInfo'), { ssr: false })
const Skeleton = dynamic(() => import('./skeleton'), { ssr: false })
const ChildCheckIn = dynamic(() => import('./ChildCheckIn'), { ssr: false })

export default function Child() {
  const { ref, inView } = useInView();
  const { data, isLoading, error } = useQuery({
    queryKey: ['children'],
    queryFn: fetchChildren,
    staleTime: 10000,
  });

  const [displayChildren, setDisplayChildren] = useState<number>(5);

  useEffect(() => {
    if (inView) {
      setDisplayChildren(displayChildren => displayChildren + 3);
    }
  }, [inView]);

  const slicedArray = data?.slice(0, displayChildren);
  if (isLoading) return <Skeleton />
  if (error) return <p> Error occured: {error.message}</p>;

  return (
    <div className="flex flex-col bg-gray-400">
      <h1 className="text-center text-5xl font-extrabold">Nursery</h1>
      <div className="grid grid-rows-3 gap-4 p-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {slicedArray?.map((child: ChildType) => (
          <div key={child.childId} className="flex rounded-md bg-white p-4">
            <ChildIntro child={child} />
            <ChildInfo child={child} />
            <ChildCheckIn child={child} />
          </div>
        ))}

        <div className="flex justify-center p-4">
          <button
            onClick={() =>
              setDisplayChildren(displayChildren => displayChildren + 3)
            }
            className="rounded-md bg-blue-500 px-4 py-2 text-3xl font-bold text-white hover:bg-blue-700"
          >
            Display more children
          </button>
        </div>
      </div>
      <p className="text-center" ref={ref}>
        Loading more children...
      </p>
    </div>
  );
}
