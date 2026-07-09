// @license MIT
// Contains AI-generated test patterns

import type { CSSProperties, Dimension, SyntheticEvent } from "./object-types";

// 1. Basic button props
export interface UIComponentTest1 {
  variant: "primary" | "secondary" | "ghost";
  size: "sm" | "md" | "lg";
  onClick: (e: SyntheticEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  disabled?: boolean;
}

// 2. Form input props
export type UIComponentTest2<T = string> = {
  name: string;
  value: T;
  onChange: (value: T) => void;
  validate?: (value: T) => string | null;
  label?: string;
  required?: boolean;
};

// 3. Modal/dialog props
export interface UIComponentTest3 {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  overlayStyles?: CSSProperties;
  portalTarget?: string;
}

// 4. List virtualization props
export type UIComponentTest4<T> = {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => ReactNode;
  overscan?: number;
};

// 5. Grid layout props
export interface UIComponentTest5 {
  columns: number | { sm: number; md: number; lg: number };
  spacing: number;
  children: ReactNode[];
  breakpoints?: Record<string, number>;
}

// 6. CSS-in-JS props
export interface UIComponentTest6 {
  sx?: CSSProperties;
  css?: Record<string, CSSProperties>;
  variants?: {
    size: Record<"sm" | "md" | "lg", CSSProperties>;
    variant: Record<"primary" | "secondary", CSSProperties>;
  };
}

// 7. Drag-and-drop props
export type UIComponentTest7<T> = {
  items: T[];
  onReorder: (newOrder: T[]) => void;
  renderDraggable: (item: T, index: number) => ReactNode;
  dragHandle?: boolean;
  axis?: "x" | "y";
};

// 8. Render props pattern
export type UIComponentTest8<T> = {
  data: T[];
  children: (item: T, index: number) => ReactNode;
  fallback?: ReactNode;
};

// 9. Compound component props
export interface UIComponentTest9 {
  children:
    | ReactNode
    | [
        Header: ReactComponent<{ title: string }>,
        Body: ReactComponent<{ scrollable?: boolean }>,
        Footer?: ReactComponent<never>,
      ];
  orientation?: "vertical" | "horizontal";
}

// 10. Headless controller props
export type UIComponentTest10<T> = {
  options: T[];
  selected: T[];
  onChange: (selected: T[]) => void;
  render: (props: {
    isOpen: boolean;
    toggle: () => void;
    selectedItems: T[];
  }) => ReactNode;
};

// 11. Animation config props
export interface UIComponentTest11 {
  enterFrom: CSSProperties;
  enterTo: CSSProperties;
  leaveFrom: CSSProperties;
  leaveTo: CSSProperties;
  duration?: number;
  easing?: string;
  onTransitionEnd?: () => void;
}

// 12. Responsive props
export type UIComponentTest12<T> = {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  apply: (value: T) => CSSProperties;
};

// 13. Slot-based component
export interface UIComponentTest13 {
  slots?: {
    header?: ReactComponent<never>;
    body?: ReactComponent<{ scrollable: boolean }>;
    footer?: ReactComponent<{ align: "left" | "right" }>;
  };
  classNames?: {
    container?: string;
    header?: string;
    body?: string;
  };
}

// 14. Icon component props
export interface UIComponentTest14Base {
  name: IconName;
  size?: number | string;
  color?: string;
}

export interface UIComponentTest14 extends UIComponentTest14Base {
  strokeWidth?: number;
  className?: string;
  onClick?: () => void;
}

// 15. Data table props
export type UIComponentTest15<T> = {
  columns: Array<{
    header: string;
    accessor: keyof T;
    render?: (value: T[keyof T], row: T) => ReactNode;
  }>;
  data: T[];
  pagination?: {
    pageSize: number;
    currentPage: number;
    onChange: (page: number) => void;
  };
};

// 16. Layout component props
export interface UIComponentTest16Base {
  direction: "row" | "column";
  align?: "start" | "center" | "end";
}

export interface UIComponentTest16 extends UIComponentTest16Base {
  justify?: "start" | "center" | "between" | "around";
  wrap?: boolean;
  gap?: number | string;
}

// 17. Theme-aware props
declare global {
  interface UIComponentTest17 {
    colorScheme?: "light" | "dark";
  }
}

// 18. Error boundary props
export interface UIComponentTest18 {
  fallback: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, info: { componentStack: string }) => void;
  children: ReactNode;
}

// 19. Portal component props
export interface UIComponentTest19 {
  target?: string | Element;
  children: ReactNode;
  wrapperStyles?: CSSProperties;
  preserveDOM?: boolean;
}

// 20. Tooltip/popover props
export interface UIComponentTest20 {
  content: ReactNode;
  placement?: "top" | "right" | "bottom" | "left";
  offset?: number;
  showArrow?: boolean;
  interactive?: boolean;
  trigger?: "hover" | "click";
}

// 21. Transition props
export interface UIComponentTest21 {
  in: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  timeout?: number | { enter: number; exit: number };
  onEnter?: () => void;
  onExited?: () => void;
}

// 22. Accessibility props
export interface UIComponentTest22Base {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

export interface UIComponentTest22 extends UIComponentTest22Base {
  role?: string;
  tabIndex?: number;
  keyboardNavigation?: boolean;
}

// 23. Infinite scroll props
export type UIComponentTest23<T> = {
  items: T[];
  loadMore: () => void;
  hasMore: boolean;
  loader: ReactNode;
  threshold?: number;
  scrollContainer?: string;
};

// 24. Resizable props
export interface UIComponentTest24 {
  initialSize: Dimension;
  minSize?: Dimension;
  maxSize?: Dimension;
  directions?: ("left" | "right" | "top" | "bottom")[];
  onResize?: (size: Dimension) => void;
  handles?: ReactNode[];
}

// 25. HOC props
export type UIComponentTest25<TOuter, TInner> = {
  component: ReactComponent<TInner>;
  transformProps: (props: TOuter) => TInner;
  forwardRef?: boolean;
  displayName?: string;
};

// Supporting internal types
type ReactNode = string | ElementNode | Array<ElementNode>;
type ReactComponent<T> = (props: T) => ReactNode;
type ElementNode = { type: string; props: Record<string, unknown> };

type IconName =
  | "check"
  | "chevron-right"
  | "user"
  | "search"
  | "settings"
  | (string & {});

type HTMLButtonElement = {
  tagName: "BUTTON";
  disabled: boolean;
  focus: () => void;
};

// view aliases
export type UIComponentTest1View = UIComponentTest1;
export type UIComponentTest3View = UIComponentTest3;
export type UIComponentTest5View = UIComponentTest5;
export type UIComponentTest6View = UIComponentTest6;
export type UIComponentTest9View = UIComponentTest9;
export type UIComponentTest11View = UIComponentTest11;
export type UIComponentTest13View = UIComponentTest13;
export type UIComponentTest14View = UIComponentTest14;
export type UIComponentTest16View = UIComponentTest16;
export type UIComponentTest17View = UIComponentTest17;
export type UIComponentTest18View = UIComponentTest18;
export type UIComponentTest19View = UIComponentTest19;
export type UIComponentTest20View = UIComponentTest20;
export type UIComponentTest21View = UIComponentTest21;
export type UIComponentTest22View = UIComponentTest22;
export type UIComponentTest24View = UIComponentTest24;
export type UIComponentTest14BaseView = UIComponentTest14Base;
export type UIComponentTest22BaseView = UIComponentTest22Base;
export type UIComponentTest16BaseView = UIComponentTest16Base;
