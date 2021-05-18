import { BrowserWindow } from 'electron';
import Vue, { VNode } from 'vue'
import { Book } from './App.vue'

declare global {

  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }

  interface Document {
    book: Book
  }
}