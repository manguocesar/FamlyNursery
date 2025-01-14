import styles from "./page.module.css";
import type { InferGetStaticPropsType } from 'next'
import { Child, ChildrenInfo } from '../types/children'
import ChildInfo from "@/components/ChildInfo";
import ChildIntro from "@/components/ChildIntro";
import CheckChild from "@/components/CheckChild";
import 'tailwindcss/tailwind.css'

export const getServerSideProps = (async () => {


  try {
    const accessToken = process.env.ACCESS_TOKEN
    const groupId = '86413ecf-01a1-44da-ba73-1aeda212a196'
    const institutionId = 'dc4bd858-9e9c-4df7-9386-0d91e42280eb'
    const URL = `https://app.famly.co/api/daycare/tablet/group?accessToken=${accessToken}&groupId=${groupId}&institutionId=${institutionId}`

    const res = await fetch(URL)
    const childrenInfo = await res.json()
    return { props: { childrenInfo } }
  } catch (error) {
    console.log(error)
  }

})


export default function Home({ childrenInfo }: InferGetStaticPropsType<any>) {

  return (
    <div className="flex flex-col justify-center items-center bg-gray-400 p-2" >
      <h1 className="font-extrabold text-5xl">Nursery</h1>
      {childrenInfo.children.map((child: Child) => (
        <div key={child.childId} className="flex justify-around border-2 rounded-lg  items-center m-3 p-3">
          <ChildIntro child={child} />
          <ChildInfo child={child} />
          <CheckChild child={child} />
        </div>
      ))
      }
    </div>
  );
}
