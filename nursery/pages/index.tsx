import { Child, ChildrenInfo } from '../types/children'
import ChildInfo from "@/components/ChildInfo";
import ChildIntro from "@/components/ChildIntro";
import 'tailwindcss/tailwind.css'
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import { checkInChild, checkOutChild } from '@/actions/children';
import { useInView } from 'react-intersection-observer'

export default function Home() {

  const [children, setChildren] = useState<Child[]>([])
  const { ref, inView } = useInView()

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN
        const groupId = '86413ecf-01a1-44da-ba73-1aeda212a196'
        const institutionId = 'dc4bd858-9e9c-4df7-9386-0d91e42280eb'
        const URL = `https://app.famly.co/api/daycare/tablet/group?accessToken=${accessToken}&groupId=${groupId}&institutionId=${institutionId}`

        const res = await fetch(URL)
        const { children } = await res.json()
        setChildren(children)

      } catch (error) {
        console.log(error)
      }
    }
    fetchChildren()
  },
    [])

  useEffect(() => {
    if (inView) { setDisplayChildren(displayChildren => displayChildren + 3) }
  }, [inView])

  const [displayChildren, setDisplayChildren] = useState<number>(5)

  const slicedArray = children?.slice(0, displayChildren)

  const now = format(Date(), "HH:mm")
  const [time, setTime] = useState<string>(now)

  return (
    <div className="flex flex-col bg-gray-400">
      <h1 className="font-extrabold text-5xl text-center">Nursery</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 grid-rows-3 gap-4 p-2" >
        {slicedArray?.map((child: Child) => (
          <div key={child.childId} className="flex justify-around border-2 rounded-lg  m-3 p-3">
            <ChildIntro child={child} />
            <ChildInfo child={child} />

            <div className=''>
              {child.checkedIn ?
                <button className="rounded-lg border-b-0 border-r-2 m-3 p-3 bg-white"
                  onClick={() => {
                    checkOutChild(child.childId)
                  }}>Check Out Child now at {time}</button>
                :
                <div className='flex flex-col items-center'>
                  <button className="rounded-lg border-b-0 border-r-2 m-3 p-3 bg-white"
                    onClick={() => {
                      checkInChild(child.childId, time)
                    }
                    }>Check In Child at
                  </button>
                  <input value={time} onChange={(ev) => { setTime(ev.target.value) }} aria-label="Time" type="time" />
                </div>
              }
            </div>
          </div>
        ))
        }
      </div>
      <div className="flex justify-center p-4">
        <button onClick={() => setDisplayChildren(displayChildren => displayChildren + 3)} className="bg-blue-500 rounded-md text-3xl hover:bg-blue-700 text-white font-bold py-2 px-4">
          Display more children
        </button>
      </div>
      <p className='text-center' ref={ref}>
        Loading more children...
      </p>
    </div>
  );
}
