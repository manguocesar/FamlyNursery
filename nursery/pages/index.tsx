import styles from "./page.module.css";
import type { InferGetStaticPropsType } from 'next'
import { Child, ChildrenInfo } from '../types/children'
import ChildInfo from "@/components/ChildInfo";
import ChildIntro from "@/components/ChildIntro";
import CheckChild from "@/components/CheckChild";
import 'tailwindcss/tailwind.css'
import { useState } from "react";

export const getServerSideProps = (async () => {


  try {
    const accessToken = process.env.ACCESS_TOKEN
    const groupId = '86413ecf-01a1-44da-ba73-1aeda212a196'
    const institutionId = 'dc4bd858-9e9c-4df7-9386-0d91e42280eb'
    const URL = `https://app.famly.co/api/daycare/tablet/group?accessToken=${accessToken}&groupId=${groupId}&institutionId=${institutionId}`

    const res = await fetch(URL)
    const { children } = await res.json()

    return { props: { children } }
  } catch (error) {
    console.log(error)
  }

})


export default function Home({ children }: Child[] | any) {

  const [displayChildren, setDisplayChildren] = useState<number>(10)

  const slicedArray = children.slice(0, displayChildren)

  return (<div className="bg-gray-400">
    <h1 className="font-extrabold text-5xl text-center">Nursery</h1>
    <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 grid-rows-3 gap-4
      p-2" >
      {slicedArray.map((child: Child) => (
        <div key={child.childId} className="flex justify-around border-2 rounded-lg  m-3 p-3">
          <ChildIntro child={child} />
          <ChildInfo child={child} />
          <CheckChild child={child} />
        </div>
      ))
      }
    </div>
    <div className="flex justify-center p-4">
      <button onClick={() => setDisplayChildren(displayChildren => displayChildren + 5)} className="bg-blue-500 rounded-md text-3xl hover:bg-blue-700 text-white font-bold py-2 px-4">
        Display more children
      </button>
    </div>
  </div>
  );
}
