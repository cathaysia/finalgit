export default {
	lineEnding: "auto",
	locales: ["zh_CN"],
	output: "src/locales/$LOCALE/$NAMESPACE.json",
	input: ["src/**/*.{js,ts,jsx,tsx}"],
	sort: true,
	keepRemoved: true,
	defaultValue: (locale, namesapce, key) => key,
};
