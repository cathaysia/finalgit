import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/ai')({
  component: AiComponent,
});

import AiCard from '@/stories/settings/ai-card';
import AiPrompt from '@/stories/settings/ai-prompt';

export default function AiComponent() {
  return (
    <>
      <AiCard />
      <AiPrompt />
    </>
  );
}
