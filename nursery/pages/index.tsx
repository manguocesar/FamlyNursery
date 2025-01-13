import styles from "./page.module.css";
import type { InferGetStaticPropsType } from 'next'

export const getStaticProps = (async () => {

  const accessToken = process.env.ACCESS_TOKEN
  const groupId = '86413ecf-01a1-44da-ba73-1aeda212a196'
  const institutionId = 'dc4bd858-9e9c-4df7-9386-0d91e42280eb'
  const URL = `https://app.famly.co/api/daycare/tablet/group?accessToken=${accessToken}&groupId=${groupId}&institutionId=${institutionId}`
  const res = await fetch(URL)
  const childrenInfo = await res.json()

  return { props: { childrenInfo } }
})

type Child = {
  childId: string;
  institutionId: string;
  groupId: string;
  createdTime: string;
  gender: number;
  name: {
    fullName: string;
    firstName: string;
    lastName: string;
    middleName: string;
  };
  birthday: string;
  startDate: string;
  checkinTime: string;
  hasVacation: boolean;
  isSick: boolean;
  isAbsent: boolean;
  onBus: boolean;
}

type ChildrenInfo = {
  children: Child[];
}
export default function Home({ childrenInfo }: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <div className={styles.page}>
      {childrenInfo.children.map((child: Child) => (
        <div key={child.childId} className={styles.childCard}>
          <h2>{child.name.fullName}</h2>
          <p>{child.checkinTime}</p>
          <p>{child.hasVacation}</p>
          <p>{child.isSick}</p>
          <p>{child.isAbsent}</p>
          <p>{child.onBus}</p>
          <p>{child.gender}</p>
        </div>
      ))
      }
    </div>
  );
}
