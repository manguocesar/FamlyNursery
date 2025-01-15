import { Child } from '../types/children';
import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import ChildCard from '@/components/ChildCard';

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

export default function Home() {
  const [children, setChildren] = useState<Child[]>([]);
  const { ref, inView } = useInView();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
        const groupId = '86413ecf-01a1-44da-ba73-1aeda212a196';
        const institutionId = 'dc4bd858-9e9c-4df7-9386-0d91e42280eb';
        const URL = `https://app.famly.co/api/daycare/tablet/group?accessToken=${accessToken}&groupId=${groupId}&institutionId=${institutionId}`;

        const res = await fetch(URL);
        const { children } = await res.json();
        setChildren(children);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChildren();
  }, []);

  useEffect(() => {
    if (inView) {
      setDisplayChildren(displayChildren => displayChildren + 3);
    }
  }, [inView]);

  const [displayChildren, setDisplayChildren] = useState<number>(5);

  const slicedArray = children?.slice(0, displayChildren);

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: fetchChildren,
  //   staleTime: 10000,
  // });

  // console.log('data', data);

  // if (isLoading) return <p> Loading...</p>;

  // if (error) return <p> Error occured: {error.message}</p>;

  return (
    <div className="flex flex-col bg-gray-400">
      <h1 className="text-center text-5xl font-extrabold">Nursery</h1>
      <div className="grid grid-rows-3 gap-4 p-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {slicedArray?.map((child: Child) => <ChildCard child={child} />)}
      </div>
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
      <p className="text-center" ref={ref}>
        Loading more children...
      </p>
    </div>
  );
}
