import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { tags as t } from '@lezer/highlight';

const chalky = '#e5c07b';
const coral = '#e06c75';
const cyan = '#56b6c2';
const invalid = '#ffffff';
const foreground = 'hsl(var(--foreground))';
const mutedForeground = 'hsl(var(--muted-foreground))';
const malibu = '#61afef';
const sage = '#98c379';
const whiskey = '#d19a66';
const violet = '#c678dd';
const background = 'hsl(var(--background))';
const muted = 'hsl(var(--muted))';
const accent = 'hsl(var(--accent))';
const accentForeground = 'hsl(var(--accent-foreground))';
const border = 'hsl(var(--border))';
const popover = 'hsl(var(--popover))';
const popoverForeground = 'hsl(var(--popover-foreground))';
const ring = 'hsl(var(--ring))';

/// The colors used in the theme, as CSS color strings.
export const color = {
  chalky,
  coral,
  cyan,
  invalid,
  foreground,
  mutedForeground,
  malibu,
  sage,
  whiskey,
  violet,
  background,
  muted,
  accent,
  accentForeground,
  border,
  popover,
  popoverForeground,
  ring,
};

/// The editor theme styles aligned with shadcn UI tokens.
export const shadcnDarkTheme = EditorView.theme(
  {
    '&': {
      color: foreground,
      backgroundColor: background,
    },
    '.cm-scroller': {
      fontFamily:
        '"Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      fontSize: '16px',
      letterSpacing: 'normal',
      lineHeight: '1.6',
    },
    '.cm-content': {
      caretColor: ring,
    },

    '.cm-cursor, .cm-dropCursor': { borderLeftColor: ring },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { backgroundColor: 'hsl(var(--accent) / 0.35)' },

    '.cm-panels': { backgroundColor: popover, color: popoverForeground },
    '.cm-panels.cm-panels-top': { borderBottom: `1px solid ${border}` },
    '.cm-panels.cm-panels-bottom': { borderTop: `1px solid ${border}` },

    '.cm-searchMatch': {
      backgroundColor: 'hsl(var(--accent) / 0.25)',
      outline: `1px solid ${accent}`,
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: 'hsl(var(--accent) / 0.4)',
    },

    '.cm-activeLine': {
      backgroundColor: 'hsl(var(--accent) / 0.08)',
    },
    '.cm-selectionMatch': { backgroundColor: 'hsl(var(--accent) / 0.3)' },

    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
      backgroundColor: 'hsl(var(--accent) / 0.3)',
    },

    '.cm-gutters': {
      backgroundColor: muted,
      color: mutedForeground,
      border: 'none',
      borderRight: `1px solid ${border}`,
    },

    '.cm-activeLineGutter': {
      backgroundColor: 'hsl(var(--accent) / 0.12)',
      color: foreground,
    },

    '.cm-foldPlaceholder': {
      backgroundColor: muted,
      border: `1px solid ${border}`,
      color: mutedForeground,
    },

    '.cm-tooltip': {
      border: `1px solid ${border}`,
      backgroundColor: popover,
      color: popoverForeground,
    },
    '.cm-tooltip .cm-tooltip-arrow:before': {
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
    },
    '.cm-tooltip .cm-tooltip-arrow:after': {
      borderTopColor: popover,
      borderBottomColor: popover,
    },
    '.cm-tooltip-autocomplete': {
      '& > ul > li[aria-selected]': {
        backgroundColor: accent,
        color: accentForeground,
      },
    },
  },
  { dark: true },
);

/// The highlighting style for code in the One Dark theme.
export const shadcnDarkHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: violet },
  {
    tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
    color: coral,
  },
  { tag: [t.function(t.variableName), t.labelName], color: malibu },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: whiskey },
  { tag: [t.definition(t.name), t.separator], color: foreground },
  {
    tag: [
      t.typeName,
      t.className,
      t.number,
      t.changed,
      t.annotation,
      t.modifier,
      t.self,
      t.namespace,
    ],
    color: chalky,
  },
  {
    tag: [
      t.operator,
      t.operatorKeyword,
      t.url,
      t.escape,
      t.regexp,
      t.link,
      t.special(t.string),
    ],
    color: cyan,
  },
  { tag: [t.meta, t.comment], color: mutedForeground },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.link, color: mutedForeground, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: coral },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: whiskey },
  { tag: [t.processingInstruction, t.string, t.inserted], color: sage },
  { tag: t.invalid, color: invalid },
]);

/// Extension to enable the One Dark theme (both the editor theme and
/// the highlight style).
export const shadcnTheme: Extension = [
  shadcnDarkTheme,
  syntaxHighlighting(shadcnDarkHighlightStyle),
];
