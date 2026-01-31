import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAppStore } from '@/hooks/use-store';
import { useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';
import { IoIosAdd } from 'react-icons/io';
import { MdDelete, MdEdit, MdMoreVert } from 'react-icons/md';

export default function AiPrompt() {
  const t = useTranslations();
  const [
    current,
    promptList,
    setPrompt,
    renamePrompt,
    removePrompt,
    setCurrent,
  ] = useAppStore(s => [
    s.currentPrompt,
    s.promptList,
    s.setPrompt,
    s.renamePrompt,
    s.removePrompt,
    s.setCurrentPrompt,
  ]);

  const prompt = promptList.get(current);
  const [content, setContent] = useState<string>(prompt || '');
  const [name, setName] = useState<string>(current);
  const [dialogType, setDialogType] = useState<
    'create' | 'rename' | 'delete' | null
  >(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const list = Array.from(promptList.keys());

  useEffect(() => {
    const prompt = promptList.get(current);
    if (prompt) {
      setContent(prompt);
    }
    setName(current);
    setDialogType(null);
  }, [current, promptList]);

  useEffect(() => {
    setPrompt(current, content);
  }, [content]);

  const builtinPrompts = new Set(['Conventional Commits', 'GitMoji']);
  const isBuiltinPrompt = builtinPrompts.has(current);
  const isConventional = current === 'Conventional Commits';
  const isGitmoji = current === 'GitMoji';

  const getCopyName = (base: string) => {
    const baseName = `${base} Copy`;
    if (!promptList.has(baseName)) {
      return baseName;
    }
    let index = 2;
    while (promptList.has(`${baseName} ${index}`)) {
      index += 1;
    }
    return `${baseName} ${index}`;
  };

  const commitRename = () => {
    const nextName = name.trim();
    if (!nextName || nextName === current) {
      setName(current);
      setDialogType(null);
      return;
    }
    if (promptList.has(nextName)) {
      setName(current);
      setDialogType(null);
      return;
    }
    renamePrompt(current, nextName);
    setDialogType(null);
  };

  const commitCreate = () => {
    const nextName = name.trim();
    if (!nextName || promptList.has(nextName)) {
      return;
    }
    const value = promptList.get(current) ?? '';
    setPrompt(nextName, value);
    setCurrent(nextName);
    setDialogType(null);
  };

  const commitDelete = () => {
    if (isBuiltinPrompt) {
      setDialogType(null);
      return;
    }
    const nextList = Array.from(promptList.keys()).filter(
      item => item !== current,
    );
    const fallback = nextList[nextList.length - 1];
    removePrompt(current);
    if (fallback) {
      setCurrent(fallback);
    }
    setDialogType(null);
  };

  return (
    <div className="flex w-full flex-col gap-2 border-border/60 bg-background/80 shadow-sm backdrop-blur dark:bg-background/60">
      <a>{t('ai.prompt')}</a>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Select
            defaultValue={current}
            onValueChange={val => {
              setCurrent(val);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue defaultValue={current} />
            </SelectTrigger>
            <SelectContent>
              {list.map(name => {
                return (
                  <SelectItem value={name} key={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Prompt actions">
                <MdMoreVert className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onSelect={() => {
                  setName(getCopyName(current));
                  setDialogType('create');
                  setTimeout(() => {
                    nameInputRef.current?.focus();
                    nameInputRef.current?.select();
                  }, 0);
                }}
              >
                <IoIosAdd className="mr-2 h-4 w-4" />
                New from current
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={isBuiltinPrompt}
                onSelect={() => {
                  if (isBuiltinPrompt) {
                    return;
                  }
                  setName(current);
                  setDialogType('rename');
                  setTimeout(() => {
                    nameInputRef.current?.focus();
                    nameInputRef.current?.select();
                  }, 0);
                }}
              >
                <MdEdit className="mr-2 h-4 w-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={isBuiltinPrompt}
                className="text-destructive"
                onSelect={() => {
                  if (isBuiltinPrompt) {
                    return;
                  }
                  setDialogType('delete');
                }}
              >
                <MdDelete className="mr-2 h-4 w-4 text-destructive" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Textarea
          className="h-80 resize-none text-base"
          readOnly={isConventional || isGitmoji}
          onChange={val => {
            const nextValue = val.target.value;
            setContent(nextValue);
            setPrompt(current, nextValue);
          }}
          value={content}
        />
      </div>
      <Dialog
        open={dialogType !== null}
        onOpenChange={() => setDialogType(null)}
      >
        <DialogContent>
          {dialogType === 'create' && (
            <>
              <DialogHeader>
                <DialogTitle>Create prompt</DialogTitle>
                <DialogDescription>
                  Create a new prompt based on the current one.
                </DialogDescription>
              </DialogHeader>
              <Input
                ref={nameInputRef}
                value={name}
                onChange={event => setName(event.target.value)}
                onKeyDown={event => {
                  if (event.key !== 'Enter') {
                    return;
                  }
                  commitCreate();
                }}
              />
              <DialogFooter>
                <Button variant="ghost" onClick={() => setDialogType(null)}>
                  Cancel
                </Button>
                <Button onClick={commitCreate}>Create</Button>
              </DialogFooter>
            </>
          )}
          {dialogType === 'rename' && (
            <>
              <DialogHeader>
                <DialogTitle>Rename prompt</DialogTitle>
                <DialogDescription>
                  Enter a new name for this prompt.
                </DialogDescription>
              </DialogHeader>
              <Input
                ref={nameInputRef}
                value={name}
                onChange={event => setName(event.target.value)}
                onKeyDown={event => {
                  if (event.key !== 'Enter') {
                    return;
                  }
                  commitRename();
                }}
              />
              <DialogFooter>
                <Button variant="ghost" onClick={() => setDialogType(null)}>
                  Cancel
                </Button>
                <Button onClick={commitRename}>Rename</Button>
              </DialogFooter>
            </>
          )}
          {dialogType === 'delete' && (
            <>
              <DialogHeader>
                <DialogTitle>Delete prompt</DialogTitle>
                <DialogDescription>
                  This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setDialogType(null)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={commitDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
