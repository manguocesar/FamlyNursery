import { checkInChild, checkOutChild, fetchChildren } from '@/actions/children';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import ChildIntro from './ChildIntro';
import ChildInfo from './ChildInfo';
import { Child as ChildType } from '@/types/children';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';


// TO DO:
// Compare time & block input
// const lastActivityDate = new Date(user[0].lastActivityDate!);
//   const now = new Date();
//   const timeDifference = now.getTime() - lastActivityDate.getTime();

// 2nd TO DO:
// add pagination with useRef with a useHook

export default function Child() {
  const now = format(Date(), 'HH:mm');
  const [time, setTime] = useState<string>(now);
  const { ref, inView } = useInView();

  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ['children'],
    queryFn: fetchChildren,
    staleTime: 10000,
  });

  const mutateCheckOut = useMutation({
    mutationFn: checkOutChild,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["children"] });
      const previousPosts = queryClient.getQueryData(["children"]);
      queryClient.setQueryData(["children"], (childId: number) => childId);

      return { previousPosts };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(["children"], context?.previousPosts);
    },
  });

  const mutateCheckIn = useMutation({
    mutationFn: ({ childId, time }: { childId: string; time: string }) => checkInChild(childId, time),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
    onMutate: async ({ childId, time }: { childId: string; time: string }) => {
      await queryClient.cancelQueries({ queryKey: ["children"] });
      const previousPosts = queryClient.getQueryData(["posts"]);
      queryClient.setQueryData(["children"], (oldData: any) => {
        return oldData.map((child: ChildType) =>
          child.childId === childId ? { ...child, checkedIn: true, time } : child
        );
      });

      return { previousPosts };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(["children"], context?.previousPosts);
    },
  });

  const [displayChildren, setDisplayChildren] = useState<number>(5);

  useEffect(() => {
    if (inView) {
      setDisplayChildren(displayChildren => displayChildren + 3);
    }
  }, [inView]);

  const slicedArray = data?.slice(0, displayChildren);

  if (isLoading) return <p> Loading...</p>;

  if (error) return <p> Error occured: {error.message}</p>;

  return (
    <div className="flex flex-col bg-gray-400">
      <h1 className="text-center text-5xl font-extrabold">Nursery</h1>
      <div className="grid grid-rows-3 gap-4 p-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {slicedArray?.map((child: ChildType) => (
          <div key={child.childId} className="flex rounded-md bg-white p-4">
            <ChildIntro child={child} />
            <ChildInfo child={child} />
            {child.checkedIn ? (
              <button
                className="m-3 rounded-lg border-b-0 border-r-2 bg-white p-3"
                onClick={() => {
                  mutateCheckOut.mutate(child.childId);
                }}
              >
                Check Out Child now at {time}
              </button>
            ) : (
              <div className="flex flex-col items-center">
                <button
                  className="m-3 rounded-lg border-b-0 border-r-2 bg-white p-3"
                  onClick={() => {
                    mutateCheckIn.mutate({ childId: child.childId, time })
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
