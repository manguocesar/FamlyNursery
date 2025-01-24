export const checkInChild = async (childId: string, time: string) => {
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  try {
    await fetch(`https://app.famly.co/api/v2/children/${childId}/checkins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken,
        pickupTime: time,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const checkOutChild = async (childId: string) => {
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  try {
    await fetch(`https://app.famly.co/api/v2/children/${childId}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchChildren = async () => {
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
