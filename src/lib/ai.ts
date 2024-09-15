import { createOllama } from "ollama-ai-provider";
import { generateText } from "ai";

export const SHORT_DEFAULT_COMMIT_TEMPLATE = `Please could you write a commit message for my changes.
Only respond with the commit message. Don't give any notes.
Explain what were the changes and why the changes were done.
Focus the most important changes.
Use the present tense.
Use a semantic commit prefix.
Hard wrap lines at 72 characters.
Ensure the title is only 50 characters.
Do not start any lines with the hash symbol.

Here is my git diff:
\`\`\`
%{diff}
\`\`\`
`;

const ollama = createOllama();

export async function generate_commit(diff: string) {
    const llama = ollama("llama3.1:latest");
    const value = await generateText({
        model: llama,
        prompt: SHORT_DEFAULT_COMMIT_TEMPLATE.replace("%{diff}", diff),
    });
    return value.text;
}
