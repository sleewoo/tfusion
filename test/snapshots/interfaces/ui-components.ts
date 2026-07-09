import { assert, type Equals } from "tsafe";

import type {
  UIComponentTest2,
  UIComponentTest4,
  UIComponentTest7,
  UIComponentTest8,
  UIComponentTest10,
  UIComponentTest12,
  UIComponentTest15,
  UIComponentTest23,
  UIComponentTest25,
  UIComponentTest1View,
  UIComponentTest3View,
  UIComponentTest5View,
  UIComponentTest6View,
  UIComponentTest9View,
  UIComponentTest11View,
  UIComponentTest13View,
  UIComponentTest14View,
  UIComponentTest16View,
  UIComponentTest17View,
  UIComponentTest18View,
  UIComponentTest19View,
  UIComponentTest20View,
  UIComponentTest21View,
  UIComponentTest22View,
  UIComponentTest24View,
  UIComponentTest14BaseView,
  UIComponentTest22BaseView,
  UIComponentTest16BaseView,
} from "@/fixtures/interfaces/ui-components.ts";

// 2. Form input props
type UIComponentTest2Flat<T = string> = {
  name: string;
  value: T;
  onChange: ((value: T) => void);
  validate?: ((value: T) => ((string) | (null)));
  label?: string;
  required?: boolean
};

// 4. List virtualization props
type UIComponentTest4Flat<T> = {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: ((item: T, index: number) => ((string) | ({
    type: string;
    props: Record<string, unknown>
  }) | (Array<{
    type: string;
    props: Record<string, unknown>
  }>)));
  overscan?: number
};

// 7. Drag-and-drop props
type UIComponentTest7Flat<T> = {
  items: T[];
  onReorder: ((newOrder: T[]) => void);
  renderDraggable: ((item: T, index: number) => ((string) | ({
    type: string;
    props: Record<string, unknown>
  }) | (Array<{
    type: string;
    props: Record<string, unknown>
  }>)));
  dragHandle?: boolean;
  axis?: (("x") | ("y"))
};

// 8. Render props pattern
type UIComponentTest8Flat<T> = {
  data: T[];
  children: ((item: T, index: number) => ((string) | ({
    type: string;
    props: Record<string, unknown>
  }) | (Array<{
    type: string;
    props: Record<string, unknown>
  }>)));
  fallback?: ((string) | ({
    type: string;
    props: Record<string, unknown>
  }) | (Array<{
    type: string;
    props: Record<string, unknown>
  }>))
};

// 10. Headless controller props
type UIComponentTest10Flat<T> = {
  options: T[];
  selected: T[];
  onChange: ((selected: T[]) => void);
  render: ((props: {
    isOpen: boolean;
    toggle: (() => void);
    selectedItems: T[]
  }) => ((string) | ({
    type: string;
    props: Record<string, unknown>
  }) | (Array<{
    type: string;
    props: Record<string, unknown>
  }>)))
};

// 12. Responsive props
type UIComponentTest12Flat<T> = {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  apply: ((value: T) => {
    [k: string]: ((string) | (number))
  })
};

// 15. Data table props
type UIComponentTest15Flat<T> = {
  columns: Array<{
    header: string;
    accessor: keyof (T);
    render?: ((value: (T)[keyof (T)], row: T) => ((string) | ({
      type: string;
      props: Record<string, unknown>
    }) | (Array<{
      type: string;
      props: Record<string, unknown>
    }>)))
  }>;
  data: T[];
  pagination?: {
    pageSize: number;
    currentPage: number;
    onChange: ((page: number) => void)
  }
};

// 23. Infinite scroll props
type UIComponentTest23Flat<T> = {
  items: T[];
  loadMore: (() => void);
  hasMore: boolean;
  loader: ((string) | ({
    type: string;
    props: Record<string, unknown>
  }) | (Array<{
    type: string;
    props: Record<string, unknown>
  }>));
  threshold?: number;
  scrollContainer?: string
};

// 25. HOC props
type UIComponentTest25Flat<TOuter, TInner> = {
  component: ((props: TInner) => ((string) | ({
    type: string;
    props: Record<string, unknown>
  }) | (Array<{
    type: string;
    props: Record<string, unknown>
  }>)));
  transformProps: ((props: TOuter) => TInner);
  forwardRef?: boolean;
  displayName?: string
};

// view aliases
type UIComponentTest1ViewFlat = {
  variant: (("primary") | ("secondary") | ("ghost"));
  size: (("sm") | ("md") | ("lg"));
  onClick: ((e: {
    target: {
      tagName: "BUTTON";
      disabled: boolean;
      focus: (() => void)
    };
    preventDefault: (() => void);
    stopPropagation: (() => void)
  }) => void);
  children: ((string) | ({
    type: string;
    props: Record<string, unknown>
  }) | (Array<{
    type: string;
    props: Record<string, unknown>
  }>));
  disabled?: boolean
};

type UIComponentTest3ViewFlat = {
  isOpen: boolean;
  onClose: (() => void);
  title: string;
  children: ((string) | ({
    type: string;
    props: Record<string, unknown>
  }) | (Array<{
    type: string;
    props: Record<string, unknown>
  }>));
  overlayStyles?: {
    [k: string]: ((string) | (number))
  };
  portalTarget?: string
};

type UIComponentTest5ViewFlat = {
  columns: ((number) | ({
    sm: number;
    md: number;
    lg: number
  }));
  spacing: number;
  children: ((string) | ({
    type: string;
    props: Record<string, unknown>
  }) | (Array<{
    type: string;
    props: Record<string, unknown>
  }>))[];
  breakpoints?: Record<string, number>
};

type UIComponentTest6ViewFlat = {
  sx?: {
    [k: string]: ((string) | (number))
  };
  css?: Record<string, {
    [k: string]: ((string) | (number))
  }>;
  variants?: {
    size: Record<(("sm") | ("md") | ("lg")), {
      [k: string]: ((string) | (number))
    }>;
    variant: Record<(("primary") | ("secondary")), {
      [k: string]: ((string) | (number))
    }>
  }
};

type UIComponentTest9ViewFlat = {
  children: ((((string) | ({
    type: string;
    props: Record<string, unknown>
  }) | (Array<{
    type: string;
    props: Record<string, unknown>
  }>))) | ([
    Header: ((props: {
      title: string
    }) => ((string) | ({
      type: string;
      props: Record<string, unknown>
    }) | (Array<{
      type: string;
      props: Record<string, unknown>
    }>))),
    Body: ((props: {
      scrollable?: boolean
    }) => ((string) | ({
      type: string;
      props: Record<string, unknown>
    }) | (Array<{
      type: string;
      props: Record<string, unknown>
    }>))),
    Footer?: ((props: never) => ((string) | ({
      type: string;
      props: Record<string, unknown>
    }) | (Array<{
      type: string;
      props: Record<string, unknown>
    }>)))
  ]));
  orientation?: (("vertical") | ("horizontal"))
};

type UIComponentTest11ViewFlat = {
  enterFrom: {
    [k: string]: ((string) | (number))
  };
  enterTo: {
    [k: string]: ((string) | (number))
  };
  leaveFrom: {
    [k: string]: ((string) | (number))
  };
  leaveTo: {
    [k: string]: ((string) | (number))
  };
  duration?: number;
  easing?: string;
  onTransitionEnd?: (() => void)
};

type UIComponentTest13ViewFlat = {
  slots?: {
    header?: ((props: never) => ((string) | ({
      type: string;
      props: Record<string, unknown>
    }) | (Array<{
      type: string;
      props: Record<string, unknown>
    }>)));
    body?: ((props: {
      scrollable: boolean
    }) => ((string) | ({
      type: string;
      props: Record<string, unknown>
    }) | (Array<{
      type: string;
      props: Record<string, unknown>
    }>)));
    footer?: ((props: {
      align: (("left") | ("right"))
    }) => ((string) | ({
      type: string;
      props: Record<string, unknown>
    }) | (Array<{
      type: string;
      props: Record<string, unknown>
    }>)))
  };
  classNames?: {
    container?: string;
    header?: string;
    body?: string
  }
};

type UIComponentTest14ViewFlat = {
  name: (("check") | ("chevron-right") | ("user") | ("search") | ("settings") | (((string) & ({}))));
  size?: ((number) | (string));
  color?: string;
  strokeWidth?: number;
  className?: string;
  onClick?: (() => void)
};

type UIComponentTest16ViewFlat = {
  direction: (("row") | ("column"));
  align?: (("start") | ("center") | ("end"));
  justify?: (("start") | ("center") | ("between") | ("around"));
  wrap?: boolean;
  gap?: ((number) | (string))
};

type UIComponentTest17ViewFlat = {
  theme?: {
    colors: Record<string, string>;
    spacing: Record<string, string>;
    breakpoints: Record<string, number>
  };
  useSystemTheme?: boolean;
  colorScheme?: (("light") | ("dark"))
};

type UIComponentTest18ViewFlat = {
  fallback: ((error: Error, reset: (() => void)) => ((string) | ({
    type: string;
    props: Record<string, unknown>
  }) | (Array<{
    type: string;
    props: Record<string, unknown>
  }>)));
  onError?: ((error: Error, info: {
    componentStack: string
  }) => void);
  children: ((string) | ({
    type: string;
    props: Record<string, unknown>
  }) | (Array<{
    type: string;
    props: Record<string, unknown>
  }>))
};

type UIComponentTest19ViewFlat = {
  target?: ((string) | (Element));
  children: ((string) | ({
    type: string;
    props: Record<string, unknown>
  }) | (Array<{
    type: string;
    props: Record<string, unknown>
  }>));
  wrapperStyles?: {
    [k: string]: ((string) | (number))
  };
  preserveDOM?: boolean
};

type UIComponentTest20ViewFlat = {
  content: ((string) | ({
    type: string;
    props: Record<string, unknown>
  }) | (Array<{
    type: string;
    props: Record<string, unknown>
  }>));
  placement?: (("top") | ("right") | ("bottom") | ("left"));
  offset?: number;
  showArrow?: boolean;
  interactive?: boolean;
  trigger?: (("hover") | ("click"))
};

type UIComponentTest21ViewFlat = {
  in: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  timeout?: ((number) | ({
    enter: number;
    exit: number
  }));
  onEnter?: (() => void);
  onExited?: (() => void)
};

type UIComponentTest22ViewFlat = {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  role?: string;
  tabIndex?: number;
  keyboardNavigation?: boolean
};

type UIComponentTest24ViewFlat = {
  initialSize: {
    width: number;
    height: number
  };
  minSize?: {
    width: number;
    height: number
  };
  maxSize?: {
    width: number;
    height: number
  };
  directions?: ((("left") | ("right") | ("top") | ("bottom")))[];
  onResize?: ((size: {
    width: number;
    height: number
  }) => void);
  handles?: ((string) | ({
    type: string;
    props: Record<string, unknown>
  }) | (Array<{
    type: string;
    props: Record<string, unknown>
  }>))[]
};

type UIComponentTest14BaseViewFlat = {
  name: (("check") | ("chevron-right") | ("user") | ("search") | ("settings") | (((string) & ({}))));
  size?: ((number) | (string));
  color?: string
};

type UIComponentTest22BaseViewFlat = {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string
};

type UIComponentTest16BaseViewFlat = {
  direction: (("row") | ("column"));
  align?: (("start") | ("center") | ("end"))
};


assert<
  Equals<
    UIComponentTest2<never>,
    UIComponentTest2Flat<never>
  >
>;
assert<
  Equals<
    UIComponentTest4<never>,
    UIComponentTest4Flat<never>
  >
>;
assert<
  Equals<
    UIComponentTest7<never>,
    UIComponentTest7Flat<never>
  >
>;
assert<
  Equals<
    UIComponentTest8<never>,
    UIComponentTest8Flat<never>
  >
>;
assert<
  Equals<
    UIComponentTest10<never>,
    UIComponentTest10Flat<never>
  >
>;
assert<
  Equals<
    UIComponentTest12<never>,
    UIComponentTest12Flat<never>
  >
>;
assert<
  Equals<
    UIComponentTest15<never>,
    UIComponentTest15Flat<never>
  >
>;
assert<
  Equals<
    UIComponentTest23<never>,
    UIComponentTest23Flat<never>
  >
>;
assert<
  Equals<
    UIComponentTest25<never, never>,
    UIComponentTest25Flat<never, never>
  >
>;
assert<
  Equals<
    UIComponentTest1View,
    UIComponentTest1ViewFlat
  >
>;
assert<
  Equals<
    UIComponentTest3View,
    UIComponentTest3ViewFlat
  >
>;
assert<
  Equals<
    UIComponentTest5View,
    UIComponentTest5ViewFlat
  >
>;
assert<
  Equals<
    UIComponentTest6View,
    UIComponentTest6ViewFlat
  >
>;
assert<
  Equals<
    UIComponentTest9View,
    UIComponentTest9ViewFlat
  >
>;
assert<
  Equals<
    UIComponentTest11View,
    UIComponentTest11ViewFlat
  >
>;
assert<
  Equals<
    UIComponentTest13View,
    UIComponentTest13ViewFlat
  >
>;
assert<
  Equals<
    UIComponentTest14View,
    UIComponentTest14ViewFlat
  >
>;
assert<
  Equals<
    UIComponentTest16View,
    UIComponentTest16ViewFlat
  >
>;
assert<
  Equals<
    UIComponentTest17View,
    UIComponentTest17ViewFlat
  >
>;
assert<
  Equals<
    UIComponentTest18View,
    UIComponentTest18ViewFlat
  >
>;
assert<
  Equals<
    UIComponentTest19View,
    UIComponentTest19ViewFlat
  >
>;
assert<
  Equals<
    UIComponentTest20View,
    UIComponentTest20ViewFlat
  >
>;
assert<
  Equals<
    UIComponentTest21View,
    UIComponentTest21ViewFlat
  >
>;
assert<
  Equals<
    UIComponentTest22View,
    UIComponentTest22ViewFlat
  >
>;
assert<
  Equals<
    UIComponentTest24View,
    UIComponentTest24ViewFlat
  >
>;
assert<
  Equals<
    UIComponentTest14BaseView,
    UIComponentTest14BaseViewFlat
  >
>;
assert<
  Equals<
    UIComponentTest22BaseView,
    UIComponentTest22BaseViewFlat
  >
>;
assert<
  Equals<
    UIComponentTest16BaseView,
    UIComponentTest16BaseViewFlat
  >
>;
