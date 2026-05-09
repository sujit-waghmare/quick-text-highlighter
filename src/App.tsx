/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Settings, 
  Search, 
  FolderIcon, 
  ChevronRight, 
  Palette,
  Info,
  Maximize2,
  Terminal,
  ExternalLink,
  Github
} from 'lucide-react';

// Implementation of the plugin logic for the preview
const applyHighlighter = (text: string) => {
  const regex = /\/\/([^:\s]+):(.*?)\/\//g;
  
  if (!regex.test(text)) return text;

  // Since we are rendering React components, we'll return an array of elements or strings
  const parts = [];
  let lastIndex = 0;
  let match;

  const internalRegex = /\/\/([^:\s]+):(.*?)\/\//g;
  while ((match = internalRegex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const settings = match[1];
    const content = match[2];
    const classes = settings.split(',')
      .map((s) => `hl-${s.trim().toLowerCase()}`)
      .join(' ');

    parts.push(
      <span key={match.index} className={classes}>
        {content}
      </span>
    );
    lastIndex = internalRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};

export default function App() {
  const [content, setContent] = useState(`## Welcome to the Quick Highlighter Preview

This is a demonstration of how the **Quick Text Highlighter** Obsidian plugin works. 
Type using the syntax //settings:text// to see the magic.

### Basic Examples
//r:Red Background//  
//g:Green Background//  
//b:Blue Background//  
//y,h:Bold Yellow//
//p,brd:Purple with Side Borders//

### Combinations
//r,h,w:CRITICAL WARNING//
//o,und:Underlined Orange//
//b,2und,h:Double Underline Blue//
//g,tape:Tape Style Green//
//p-t,italic:Just Purple Text (italic)//

### Why use it?
It's much faster than typing <mark>tags</mark> or using HTML.
//y:Highlights important notes// instantly in your vault.`);

  const [activeTab, setActiveTab] = useState('editor');

  return (
    <div className="flex h-screen bg-[#1e1e1e] text-[#b4b4b4] font-sans selection:bg-[#4a4a4a]">
      {/* Sidebar - Mimicking Obsidian */}
      <div className="w-64 border-r border-[#2d2d2d] flex flex-col hidden md:flex">
        <div className="p-4 border-b border-[#2d2d2d] flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            <FolderIcon size={16} className="text-[#969696]" />
            Vault
          </div>
          <Settings size={14} className="text-[#969696] cursor-pointer hover:text-white" />
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          <div className="flex items-center gap-1.5 p-1.5 text-sm hover:bg-[#2d2d2d] rounded cursor-pointer transition-colors group">
            <ChevronRight size={14} className="text-[#969696] group-hover:text-white" />
            <FileText size={16} className="text-[#7d7d7d]" />
            <span>Plugin.md</span>
          </div>
          <div className="flex items-center gap-1.5 p-1.5 text-sm hover:bg-[#2d2d2d] rounded cursor-pointer transition-colors mt-1 opacity-50">
            <ChevronRight size={14} className="text-[#969696]" />
            <FolderIcon size={16} className="text-[#7d7d7d]" />
            <span>Templates</span>
          </div>
        </div>

        <div className="p-4 border-t border-[#2d2d2d] text-xs text-[#7d7d7d]">
          <div className="flex items-center gap-2 mb-2">
            <Info size={12} />
            Quick Text Highlighter v1.1.0
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-10 border-b border-[#2d2d2d] flex items-center px-4 justify-between bg-[#2d2d2d]/30">
          <div className="flex items-center gap-2 scroll-px-0">
            <FileText size={14} />
            <span className="text-xs font-semibold tracking-wide uppercase">Highlighter Preview</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex bg-[#121212] rounded overflow-hidden p-0.5 border border-[#3d3d3d]">
               <button 
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1 text-[10px] font-bold rounded-sm transition-all ${activeTab === 'editor' ? 'bg-[#3d3d3d] text-white shadow-sm' : 'text-[#7d7d7d] hover:text-white'}`}
               >
                 EDITOR
               </button>
               <button 
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 text-[10px] font-bold rounded-sm transition-all ${activeTab === 'preview' ? 'bg-[#3d3d3d] text-white shadow-sm' : 'text-[#7d7d7d] hover:text-white'}`}
               >
                 PREVIEW
               </button>
             </div>
             <Maximize2 size={12} className="text-[#7d7d7d] cursor-pointer hover:text-white" />
          </div>
        </header>

        <main className="flex-1 overflow-hidden flex relative">
          <AnimatePresence mode="wait">
            {activeTab === 'editor' ? (
              <motion.div 
                key="editor"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex-1 flex flex-col p-8 md:p-12"
              >
                <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col">
                  <div className="mb-4 flex items-center justify-between text-[#7d7d7d]">
                    <div className="flex items-center gap-2 text-xs">
                      <Terminal size={14} />
                      Raw Markdown Source
                    </div>
                  </div>
                  <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed text-[#d4d4d4] placeholder-[#4a4a4a]"
                    placeholder="Enter some text here..."
                    spellCheck={false}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="preview"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex-1 overflow-y-auto p-8 md:p-12 prose prose-invert max-w-none prose-sm selection:bg-[#4a4a4a]/50"
              >
                <div className="max-w-4xl w-full mx-auto">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[#7d7d7d]">
                      <Search size={14} />
                      Rendered View
                    </div>
                    <div className="flex items-center gap-3">
                      <a href="https://github.com/sujit-waghmare" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-[#7d7d7d] hover:text-[#fa8231] transition-colors">
                        <Github size={14} />
                        GitHub
                      </a>
                    </div>
                  </div>
                  
                  <div className="markdown-content space-y-4">
                    {content.split('\n').map((line, i) => {
                      if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold border-b border-[#2d2d2d] pb-2 mt-8 mb-4 text-white">{applyHighlighter(line.substring(3))}</h2>;
                      if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-semibold mt-6 mb-3 text-[#d4d4d4]">{applyHighlighter(line.substring(4))}</h3>;
                      if (!line.trim()) return <div key={i} className="h-4" />;
                      return <p key={i} className="leading-relaxed">{applyHighlighter(line)}</p>;
                    })}
                  </div>

                  <div className="mt-12 p-6 rounded-xl border border-[#2d2d2d] bg-[#2d2d2d]/20">
                    <div className="flex items-center gap-2 mb-4 font-bold text-white">
                      <Palette size={18} className="text-[#fa8231]" />
                      Style Sheet Cheat Sheet
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-[#7d7d7d] block font-mono">r, g, b, y, p, o</span>
                        <span>Primary Colors</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[#7d7d7d] block font-mono">h, w, brd</span>
                        <span>Heavy, White, Border</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[#7d7d7d] block font-mono">und, dot, 2und</span>
                        <span>Underline types</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[#7d7d7d] block font-mono">fancy, tape</span>
                        <span>Advanced Styles</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[#7d7d7d] block font-mono">-t (e.g. r-t)</span>
                        <span>Text Color Only</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Action for User */}
      <div className="absolute bottom-6 right-6">
        <a 
          href="https://github.com/sujit-waghmare/Template" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#fa8231] hover:bg-[#ff954d] text-white px-4 py-2 rounded-full shadow-lg transition-all transform hover:scale-105 font-bold text-sm"
        >
          <ExternalLink size={16} />
          Use Template
        </a>
      </div>
    </div>
  );
}
