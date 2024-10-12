import type { BlameHunk } from '@/bindings';
import { BlameCard } from '@/stories/atoms/BlameCard';
import { syntaxTree } from '@codemirror/language';
import type { Range } from '@codemirror/state';
import { WidgetType } from '@codemirror/view';
import {
  Decoration,
  type EditorView,
  ViewPlugin,
  type ViewUpdate,
} from '@codemirror/view';
import { createRoot } from 'react-dom/client';

class BlameWidget extends WidgetType {
  constructor(readonly blame: BlameHunk) {
    super();
  }

  // biome-ignore lint/style/useNamingConvention: <explanation>
  toDOM() {
    const card = BlameCard(this.blame);

    const container = document.createElement('span');

    createRoot(container).render(card);
    return container;
  }

  ignoreEvent() {
    return false;
  }
}

type WidgetTypeItem = Range<Decoration> | null;
function blameLines(view: EditorView, hunks: BlameHunk[]) {
  const widgets: WidgetTypeItem[] = [];

  function getText(num: number) {
    for (const item of hunks) {
      if (
        item.final_start_line <= num &&
        item.final_start_line + item.lines > num
      ) {
        return item;
      }
    }
  }

  for (let i = 1; i <= view.state.doc.lines; i += 1) {
    const line = view.state.doc.line(i);
    if (line.text.trim().length === 0) {
      widgets.push(null);
      continue;
    }
    const blame = getText(i);
    if (blame) {
      const deco = Decoration.widget({
        widget: new BlameWidget(blame),
        side: 1,
      });
      widgets.push(deco.range(line.to));
    }
  }
  return widgets;
}

class BlamePluginInner {
  decorations: WidgetTypeItem[];
  cursor: undefined | number;

  constructor(
    view: EditorView,
    readonly hunks: BlameHunk[],
  ) {
    this.decorations = blameLines(view, this.hunks);
  }

  update(update: ViewUpdate) {
    const head = update.state.selection.main.head;
    const cursor = update.state.doc.lineAt(head);
    this.cursor = cursor.number - 1;

    if (
      update.docChanged ||
      update.viewportChanged ||
      syntaxTree(update.startState) !== syntaxTree(update.state)
    ) {
      this.decorations = blameLines(update.view, this.hunks);
    }
  }

  decorationAt() {
    if (this.cursor !== undefined) {
      const res = this.decorations[this.cursor];
      return Decoration.set(res || []);
    }
    return Decoration.set([]);
  }
}

export function BlamePlugin(blame: BlameHunk[]) {
  return ViewPlugin.define(
    view => {
      return new BlamePluginInner(view, blame);
    },
    {
      decorations: v => v.decorationAt(),

      eventHandlers: {
        mousedown: (e, view) => {
          const target = e.target as HTMLElement;
          if (
            target.nodeName === 'INPUT' &&
            target.classList.contains('cm-boolean-toggle')
          )
            return toggleBoolean(view, view.posAtDOM(target));
        },
      },
    },
  );
}

function toggleBoolean(_view: EditorView, _pos: number) {
  // const before = view.state.doc.sliceString(Math.max(0, pos - 5), pos);
  // let change: ChangeSpec;
  // if (before === 'false') change = { from: pos - 5, to: pos, insert: 'true' };
  // else if (before.endsWith('true'))
  //   change = { from: pos - 4, to: pos, insert: 'false' };
  // else return false;
  // view.dispatch({ changes: change });
  return true;
}
