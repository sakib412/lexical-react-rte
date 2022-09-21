/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { AutoScrollPlugin } from '@lexical/react/LexicalAutoScrollPlugin';
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
// @ts-ignore
import * as React from 'react';
import { useRef, useState } from 'react';

import { useSharedHistoryContext } from './context/SharedHistoryContext';
import TableCellNodes from './nodes/TableCellNodes';
import AutocompletePlugin from './plugins/AutocompletePlugin';
import AutoEmbedPlugin from './plugins/AutoEmbedPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import ClickableLinkPlugin from './plugins/ClickableLinkPlugin';
import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import ComponentPickerPlugin from './plugins/ComponentPickerPlugin';
import EmojisPlugin from './plugins/EmojisPlugin';
import EquationsPlugin from './plugins/EquationsPlugin';
import FigmaPlugin from './plugins/FigmaPlugin';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin';
import HorizontalRulePlugin from './plugins/HorizontalRulePlugin';
import ImagesPlugin from './plugins/ImagesPlugin';
import KeywordsPlugin from './plugins/KeywordsPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import MarkdownShortcutPlugin from './plugins/MarkdownShortcutPlugin';
import { MaxLengthPlugin } from './plugins/MaxLengthPlugin';
import MentionsPlugin from './plugins/MentionsPlugin';
import PollPlugin from './plugins/PollPlugin';
import SpeechToTextPlugin from './plugins/SpeechToTextPlugin';
import TabFocusPlugin from './plugins/TabFocusPlugin';
import TableCellActionMenuPlugin from './plugins/TableActionMenuPlugin';
import { TablePlugin as NewTablePlugin } from './plugins/TablePlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import TwitterPlugin from './plugins/TwitterPlugin';
import YouTubePlugin from './plugins/YouTubePlugin';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import ContentEditable from './ui/ContentEditable';
import Placeholder from './ui/Placeholder';

export default function Editor(): JSX.Element {
  const { historyState } = useSharedHistoryContext();

  const text = 'Enter some rich text...';
  const placeholder = <Placeholder>{text}</Placeholder>;
  const scrollRef = useRef(null);
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  const cellEditorConfig = {
    namespace: 'Playground',
    nodes: [...TableCellNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  return (
    <>
      <ToolbarPlugin />
      <div
        className={`editor-container`}
        ref={scrollRef}>
        <MaxLengthPlugin maxLength={30} />
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        <ComponentPickerPlugin />
        <AutoEmbedPlugin />
        <MentionsPlugin />
        <EmojisPlugin />
        <HashtagPlugin />
        <KeywordsPlugin />
        <SpeechToTextPlugin />
        <AutoLinkPlugin />
        <AutoScrollPlugin scrollRef={scrollRef} />

        <>
          <HistoryPlugin externalHistoryState={historyState} />

          <RichTextPlugin
            contentEditable={
              <div className="editor-scroller">
                <div className="editor" ref={onRef}>
                  <ContentEditable />
                </div>
              </div>
            }
            placeholder={placeholder}
          />
          <MarkdownShortcutPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <TablePlugin />
          <NewTablePlugin cellEditorConfig={cellEditorConfig}>
            <AutoFocusPlugin />
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="TableNode__contentEditable" />
              }
              placeholder={''}
            />
            <MentionsPlugin />
            <HistoryPlugin />
            <ImagesPlugin captionsEnabled={false} />
            <LinkPlugin />
            <ClickableLinkPlugin />
            <FloatingTextFormatToolbarPlugin />
          </NewTablePlugin>
          <ImagesPlugin />
          <LinkPlugin />
          <PollPlugin />
          <TwitterPlugin />
          <YouTubePlugin />
          <FigmaPlugin />
          <ClickableLinkPlugin />
          <HorizontalRulePlugin />
          <EquationsPlugin />
          <TabFocusPlugin />
          {floatingAnchorElem && (
            <>
              <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
              <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
              <TableCellActionMenuPlugin anchorElem={floatingAnchorElem} />
              <FloatingTextFormatToolbarPlugin
                anchorElem={floatingAnchorElem}
              />
            </>
          )}
        </>

        <CharacterLimitPlugin charset={'UTF-8'} />

        <AutocompletePlugin />
        {/* <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
        <div className="toc">
          {showTableOfContents && <TableOfContentsPlugin />}
        </div> */}
      </div>
    </>
  );
}
