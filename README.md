## Scope of work
Testing API calls with state manager
Calling Nursery API as mocked data

## Functions
1. List children with pagination/lazy-loading/infinite-scroll
2. Checkin a child
3. Checkout a child

### API DOC

The API does not support any limit or offset, so the pagination/lazy-loading/infinite-scroll will have to be done client-side only.

```
GET https://app.famly.co/api/daycare/tablet/group
Arguments: {
	accessToken: <accessToken>,
	groupId: '86413ecf-01a1-44da-ba73-1aeda212a196',
	institutionId: 'dc4bd858-9e9c-4df7-9386-0d91e42280eb'
}
```

Example in cURL:

```bash
curl "https://app.famly.co/api/daycare/tablet/group?accessToken=<accessToken>&groupId=86413ecf-01a1-44da-ba73-1aeda212a196&institutionId=dc4bd858-9e9c-4df7-9386-0d91e42280eb"
```

### Checkin child
```
POST https://app.famly.co/api/v2/children/<childId>/checkins

Arguments: {
	accessToken: <accessToken>
	pickupTime: 16:00
}
```

Example in cURL:

```bash
curl \
  -d 'accessToken=<accessToken>&pickupTime=16:00' \
  https://app.famly.co/api/v2/children/fcd683d0-bc31-468c-948f-1ca70b91439d/checkins
```

### Checkout child
```
POST https://app.famly.co/api/v2/children/<childId>/checkout
Arguments: {
	accessToken: <accessToken>
}
```

Example in cURL:

```bash
curl \
  -d 'accessToken=<accessToken>' \
  https://app.famly.co/api/v2/children/fcd683d0-bc31-468c-948f-1ca70b91439d/checkout
```

## tech choices
NextJs APP so that the data is static & ready in contrast with a react app 
Fetch the data as infinite scroll with getStaticProps --
Post Checkin Child btn near the child card
Post Checkout Child btn near the child card

Token in .env

## next steps
1. suspense & skeleton
2. Compare time & block input
3. const lastActivityDate = new Date(user[0].lastActivityDate!);
4. const now = new Date();
5. const timeDifference = now.getTime() - lastActivityDate.getTime();
6. add pagination with useRef with a useHook