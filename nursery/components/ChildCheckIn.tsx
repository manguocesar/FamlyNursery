import React, { useState } from 'react'
import { Child as ChildType } from '@/types/children';
import { format } from 'date-fns';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { checkInChild, checkOutChild, fetchChildren } from '@/actions/children';


const ChildCheckIn = ({ child }: { child: ChildType }) => {
    const now = format(Date(), 'HH:mm');
    const [time, setTime] = useState<string>(now);


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

    const disableCheckIn = (time: string) => {
        let isDisable = time.replace(':', '') < now.replace(':', '')
        return isDisable
    }

    return (
        <>
            {child.checkedIn ? (
                <button
                    className="m-3 rounded-lg border-2 font-bold bg-white p-3 hover:scale-110 transform transition duration-500 ease-in-out"
                    onClick={() => {
                        mutateCheckOut.mutate(child.childId);
                    }}
                >
                    Check Out Child now at {time}
                </button>
            ) : (
                <div className="flex flex-col items-center">
                    <button
                        disabled={disableCheckIn(time)}
                        className={`m-3 rounded-lg border-2 bg-white p-3 font-bold
                    ${disableCheckIn(time) ?
                         'border-red-600 text-red-600 opacity-35' :
                         'border-green-500 text-green-500 hover:scale-110 transform transition duration-500 ease-in-out'}`}
                        onClick={() => {
                            mutateCheckIn.mutate({ childId: child.childId, time })
                        }}
                    >
                        Check In Child at
                    </button>
                    <input
                        className='border-2 border-gray-500 rounded-md p-2'
                        defaultValue={now}
                        onChange={ev => {
                            setTime(ev.target.value);
                        }}
                        aria-label="Time"
                        type="time"

                    />
                </div>
            )}
        </>
    )
}

export default ChildCheckIn