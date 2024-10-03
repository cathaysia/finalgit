import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAiState } from '@/lib/state';

import { useTranslation } from 'react-i18next';

export default function () {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useAiState(s => [s.prompt, s.setPrompt]);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('ai.prompt')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={prompt}
          className="text-base"
          onChange={val => {
            setPrompt(val.target.value);
          }}
        />
      </CardContent>
    </Card>
  );
}
