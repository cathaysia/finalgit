import i18n from '@/locales';
import type { StoryContext, StoryFn } from '@storybook/react';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

export function withI18next(Story: StoryFn, context: StoryContext) {
  const { locale } = context.globals;

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <I18nextProvider i18n={i18n}>
      <Story />
    </I18nextProvider>
  );
}
