import styles from "./page.module.css";
import type { InferGetStaticPropsType } from 'next'
import { Child } from '../types/types'
import ChildInfo from "@/components/ChildInfo";
import ChildIntro from "@/components/ChildIntro";
import CheckChild from "@/components/CheckChild";

export const getStaticProps = (async () => {

  const accessToken = process.env.ACCESS_TOKEN
  const groupId = '86413ecf-01a1-44da-ba73-1aeda212a196'
  const institutionId = 'dc4bd858-9e9c-4df7-9386-0d91e42280eb'
  const URL = `https://app.famly.co/api/daycare/tablet/group?accessToken=${accessToken}&groupId=${groupId}&institutionId=${institutionId}`
  const res = await fetch(URL)
  const childrenInfo = await res.json()

  return { props: { childrenInfo } }
})


export default function Home({ childrenInfo }: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <div className={styles.page}>
      {childrenInfo.children.map((child: Child) => (
        <div key={child.childId} className={styles.childCard}>
          <ChildIntro child={child} />
          <ChildInfo child={child} />
          <CheckChild child={child} />
        </div>
      ))
      }
    </div>
  );
}