import languageMap_ from "@/language-map.json";

const languageMap = languageMap_ as {
	fileExtensions: Record<string, string>;
	fileNames: Record<string, string>;
};

export default languageMap;
