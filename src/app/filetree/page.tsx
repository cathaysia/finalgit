'use client';
import CodeMirror from '@uiw/react-codemirror';
import { Nav } from '@/components/Nav';
import { useAppState } from '@/lib/state';
import FilePanel from '@/stories/panels/FilePanel';
import { useState } from 'react';
import { MdHome } from 'react-icons/md';
import { commands } from '@/bindings';
import { match } from 'ts-pattern';
import NOTIFY from '@/lib/notify';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import { useTheme } from 'next-themes';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { redirect } from 'next/navigation';

export default function FileTree() {
    const [repoPath, tree, current] = useAppState(s => [
        s.repoPath,
        s.files,
        s.current,
    ]);
    if (tree.length === 0) {
        redirect('/');
    }
    const [text, setText] = useState<string>();
    const { theme } = useTheme();
    const [language, setLanguage] = useState<string>();
    const mirrorTheme = theme === 'dark' ? githubDark : githubLight;

    async function getText(path: string) {
        if (!current || !repoPath) {
            return;
        }
        const normalPath = path.slice(1);
        const language = await commands.assumeLanguage(normalPath);
        match(language).with({ status: 'ok' }, val => {
            if (val.data) {
                setLanguage(val.data);
            }
        });

        const content = await commands?.getFileContent(
            repoPath,
            current,
            normalPath,
        );
        match(content)
            .with({ status: 'ok' }, val => {
                setText(val.data);
            })
            .with({ status: 'error' }, err => {
                NOTIFY.error(err.error);
            });
    }

    const extensions = [];
    if (language) {
        // @ts-ignore
        extensions.push(loadLanguage(language));
    }

    return (
        <div
            className="h-screen flex p-2 overflow-clip"
            data-tauri-drag-region={true}
        >
            <div className="flex flex-col min-w-52">
                <Nav to="/" text={<MdHome />} />
                <FilePanel files={tree} onClicked={getText} />
            </div>
            <CodeMirror
                value={text}
                className="h-screen w-full text-base font-mono text-black"
                height="100%"
                theme={mirrorTheme}
                readOnly
                // @ts-ignore
                extensions={extensions}
            />
        </div>
    );
}
