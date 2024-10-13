import type { BlameHunk } from '@/bindings';
import { BlameCard } from '@/stories/atoms/BlameCard';
import { syntaxTree } from '@codemirror/language';
import { WidgetType } from '@codemirror/view';
import {
  Decoration,
  type EditorView,
  ViewPlugin,
  type ViewUpdate,
} from '@codemirror/view';
import { createRoot } from 'react-dom/client';

class BlameWidget extends WidgetType {
  container: HTMLElement;
  constructor(readonly blame: BlameHunk) {
    super();
    this.container = document.createElement('span');
  }

  // biome-ignore lint/style/useNamingConvention: <explanation>
  toDOM() {
    const card = BlameCard(this.blame);

    createRoot(this.container).render(card);
    return this.container;
  }

  ignoreEvent() {
    return false;
  }
}

class BlamePlugin {
  cursor: undefined | number;
  view: EditorView;

  constructor(
    view: EditorView,
    readonly hunks: BlameHunk[],
  ) {
    this.view = view;
  }

  update(update: ViewUpdate) {
    const head = update.state.selection.main.head;
    const cursor = update.state.doc.lineAt(head);
    this.cursor = cursor.number;

    if (
      update.docChanged ||
      update.viewportChanged ||
      syntaxTree(update.startState) !== syntaxTree(update.state)
    ) {
      this.view = update.view;
    }
  }

  createBlameWidget() {
    if (this.cursor === undefined) {
      return undefined;
    }

    const cursor = this.cursor;

    const hunk = this.hunks.find(item => {
      return (
        item.final_start_line <= cursor &&
        item.final_start_line + item.lines > cursor
      );
    });

    if (hunk === undefined) {
      return undefined;
    }

    const line = this.view.state.doc.line(cursor);
    if (line.text.trim().length === 0) {
      return undefined;
    }

    const widget = Decoration.widget({
      widget: new BlameWidget(hunk),
      side: 1,
    });

    return widget.range(line.to);
  }

  blameLine() {
    const widget = this.createBlameWidget();
    if (widget === undefined) {
      return Decoration.set([]);
    }
    return Decoration.set([widget]);
  }
}

export function createBlamePlugin(blame: BlameHunk[]) {
  return ViewPlugin.define(
    view => {
      return new BlamePlugin(view, blame);
    },
    {
      decorations: v => v.blameLine(),
    },
  );
}
