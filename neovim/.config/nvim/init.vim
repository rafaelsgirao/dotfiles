syntax on
set ruler
set number
let no_buffers_menu=1
set smartcase
set ignorecase

set incsearch

set backspace=indent,eol,start

set laststatus=2

set relativenumber

set shortmess+=I

set nocompatible

" Specify a directory for plugins
" - For Neovim: stdpath('data') . '/plugged'
" - Avoid using standard Vim directory names like 'plugin'
call plug#begin('~/.vim/plugged')
" gc<operator> to toggle comment respective lines
Plug 'tpope/vim-commentary'

" Initialize plugin system
call plug#end()
