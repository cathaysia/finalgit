import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/diff/')({
  component: () => {
    return <span>diff</span>;
  },
});
