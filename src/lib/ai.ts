import { createOllama } from "ollama-ai-provider";
import { generateText } from "ai";

const ollama = createOllama();

export async function generate_commit(diff: string, prompt: string) {
    const llama = ollama("llama3.1:latest");
    const value = await generateText({
        model: llama,
        prompt: prompt.replace("%{diff}", diff),
    });
    return value.text;
}
