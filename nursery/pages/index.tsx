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

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ChildCard />
    </QueryClientProvider>
  );
}
