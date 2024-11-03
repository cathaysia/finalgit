import { Checkbox } from '@/components/ui/checkbox';
import { syntaxTree } from '@codemirror/language';
import type { ChangeSpec, Range } from '@codemirror/state';
import { WidgetType } from '@codemirror/view';
import {
  Decoration,
  type DecorationSet,
  type EditorView,
  ViewPlugin,
  type ViewUpdate,
} from '@codemirror/view';
import { createRoot } from 'react-dom/client';

class CheckboxWidget extends WidgetType {
  constructor(readonly checked: boolean) {
    super();
  }

  eq(other: CheckboxWidget) {
    return other.checked === this.checked;
  }

  // biome-ignore lint/style/useNamingConvention: <explanation>
  toDOM() {
    const element = (
      <Checkbox
        className="cm-boolean-toggle ml-2"
        defaultChecked={this.checked}
        onChange={() => {}}
        aria-hidden
      />
    );

    const container = document.createElement('span');

    createRoot(container).render(element);
    return container;
  }

  ignoreEvent() {
    return false;
  }
}

function checkboxes(view: EditorView) {
  const widgets: Range<Decoration>[] = [];
  for (const { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from,
      to,
      enter: node => {
        if (node.name === 'True' || node.name === 'False') {
          const isTrue =
            view.state.doc.sliceString(node.from, node.to) === 'true';
          const deco = Decoration.widget({
            widget: new CheckboxWidget(isTrue),
            side: 1,
          });
          widgets.push(deco.range(node.to));
        }
      },
    });
  }
  return Decoration.set(widgets);
}
export const checkboxPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = checkboxes(view);
    }

    update(update: ViewUpdate) {
      if (
        update.docChanged ||
        update.viewportChanged ||
        syntaxTree(update.startState) !== syntaxTree(update.state)
      )
        this.decorations = checkboxes(update.view);
    }
  },
  {
    decorations: v => v.decorations,

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

function toggleBoolean(view: EditorView, pos: number) {
  const before = view.state.doc.sliceString(Math.max(0, pos - 5), pos);
  let change: ChangeSpec;
  if (before === 'false') change = { from: pos - 5, to: pos, insert: 'true' };
  else if (before.endsWith('true'))
    change = { from: pos - 4, to: pos, insert: 'false' };
  else return false;
  view.dispatch({ changes: change });
  return true;
}
