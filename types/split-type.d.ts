declare module 'split-type' {
  interface SplitTypeOptions {
    types?: string | string[];
    tagName?: string;
    wordsClass?: string;
    charsClass?: string;
    linesClass?: string;
  }

  interface SplitTypeResult {
    chars?: HTMLElement[];
    words?: HTMLElement[];
    lines?: HTMLElement[];
  }

  export default class SplitType {
    constructor(target: string | Element, options?: SplitTypeOptions);
    chars?: HTMLElement[];
    words?: HTMLElement[];
    lines?: HTMLElement[];
  }
}