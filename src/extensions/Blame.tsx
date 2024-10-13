import { syntaxTree } from '@codemirror/language';
import { WidgetType } from '@codemirror/view';
import {
  Decoration,
  type EditorView,
  ViewPlugin,
  type ViewUpdate,
} from '@codemirror/view';
import type { MutableRefObject } from 'react';

class BlameWidget extends WidgetType {
  constructor(readonly container: HTMLElement) {
    super();
  }

  // biome-ignore lint/style/useNamingConvention: <explanation>
  toDOM() {
    return this.container;
  }

  ignoreEvent() {
    return false;
  }
}

class BlamePlugin {
  cursor: undefined | number;
  view: EditorView;
  container: HTMLElement;
  onCursorChange: (cursor: number) => void;
  widget: Decoration;

  constructor(view: EditorView, onCursorChange: (cursor: number) => void) {
    this.view = view;

    const container = document.createElement('span');
    container.style.display = 'inline-block';
    this.container = container;
    this.onCursorChange = onCursorChange;
    this.widget = Decoration.widget({
      widget: new BlameWidget(this.container),
      side: 1,
    });
  }

  update(update: ViewUpdate) {
    const head = update.state.selection.main.head;
    const cursor = update.state.doc.lineAt(head);
    const needCallback = this.cursor !== cursor.number;
    this.cursor = cursor.number;

    if (
      update.docChanged ||
      update.viewportChanged ||
      syntaxTree(update.startState) !== syntaxTree(update.state)
    ) {
      this.view = update.view;
    }
    if (needCallback) {
      this.onCursorChange(cursor.number);
    }
  }

  createBlameWidget() {
    if (this.cursor === undefined) {
      return undefined;
    }

    const cursor = this.cursor;

    const line = this.view.state.doc.line(cursor);
    if (line.text.trim().length === 0) {
      return undefined;
    }

    return this.widget.range(line.to);
  }

  blameLine() {
    const widget = this.createBlameWidget();
    if (widget === undefined) {
      return Decoration.set([]);
    }
    return Decoration.set([widget]);
  }
}

export function createBlamePlugin(
  inner: MutableRefObject<HTMLElement | undefined>,
  onCursorChange: (cursor: number) => void,
) {
  return ViewPlugin.define(
    view => {
      const plugin = new BlamePlugin(view, onCursorChange);
      inner.current = plugin.container;
      return plugin;
    },
    {
      decorations: v => v.blameLine(),
    },
  );
}
