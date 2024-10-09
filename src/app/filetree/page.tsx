import { Navigate, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/filetree/')({
  component: () => {
    <Navigate to="/" />;
  },
});
