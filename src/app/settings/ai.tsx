import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/ai')({
  component: AiComponent,
});

import AiCard from '@/stories/settings/AiCard';
import AiPrompt from '@/stories/settings/AiPrompt';

export default function AiComponent() {
  return (
    <>
      <AiCard />
      <AiPrompt />
    </>
  );
}
