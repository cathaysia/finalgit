import GitCore from '@/stories/settings/GitCore';
import GitUser from '@/stories/settings/GitUser';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/git')({
  component: GitComponent,
});

export default function GitComponent() {
  return (
    <>
      <GitCore />
      <GitUser />
    </>
  );
}
