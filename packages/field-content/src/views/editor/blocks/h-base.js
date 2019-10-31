import * as React from 'react';
import { hasBlock } from '../utils';
import { type as defaultType } from './paragraph';
import { ToolbarButton } from '../toolbar-components';

export default function createHeadingView(type) {
  // @keystone-alpha/field-content/src/views/editor/blocks/heading.js
  function ToolbarElement({ editor, editorState }) {
    return (
      <ToolbarButton
        icon={<span aria-hidden>{type.toUpperCase()}</span>}
        label={type.toUpperCase()}
        isActive={hasBlock(editorState, type)}
        onClick={() => {
          if (hasBlock(editorState, type)) {
            editor.setBlocks({ type: defaultType });
          } else {
            editor.setBlocks({ type: type });
          }
          editor.focus();
        }}
      />
    );
  }

  function Node({ attributes, children }) {
    if (type == 'h2') return <h2 {...attributes}>{children}</h2>;
    if (type == 'h3') return <h3 {...attributes}>{children}</h3>;
    if (type == 'h4') return <h4 {...attributes}>{children}</h4>;
  }

  let getPlugins = () => [
    {
      onKeyDown(event, editor, next) {
        // make it so when you press enter after typing a heading,
        // the block type will change to a paragraph
        if (event.keyCode === 13 && editor.value.blocks.every(block => block.type === type)) {
          editor.splitBlock().setBlocks(defaultType);
          return;
        }
        next();
      },
    },
  ];

  return { type, ToolbarElement, Node, getPlugins };
}
