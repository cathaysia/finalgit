export default {
  lineEnding: 'auto',
  locales: ['en_US', 'zh_CN'],
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
  input: ['src/**/*.{js,ts,jsx,tsx}'],
  sort: true,
  keepRemoved: [/license-card.*/],
  defaultValue: (locale, namesapce, key) => key,
};
