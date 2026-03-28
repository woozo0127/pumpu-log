'use client';

// Storybook/web-only implementation of @rn-primitives/checkbox
// Uses native HTML elements so NativeWind className works correctly on web

import * as React from 'react';

interface CheckboxContextValue {
  checked?: boolean;
  disabled?: boolean;
}

const CheckboxContext = React.createContext<CheckboxContextValue>({});

interface RootProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Root = React.forwardRef<HTMLButtonElement, RootProps>(
  ({ checked, onCheckedChange, disabled, className, children, style, ...props }, ref) => {
    return (
      <CheckboxContext.Provider value={{ checked, disabled }}>
        <button
          ref={ref}
          role="checkbox"
          aria-checked={checked}
          disabled={disabled}
          data-state={checked ? 'checked' : 'unchecked'}
          onClick={() => onCheckedChange?.(!checked)}
          className={className}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            ...style,
          }}
          {...props}
        >
          {children}
        </button>
      </CheckboxContext.Provider>
    );
  },
);
Root.displayName = 'WebCheckboxRoot';

interface IndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  forceMount?: boolean;
}

const Indicator = React.forwardRef<HTMLSpanElement, IndicatorProps>(
  ({ className, children, forceMount, ...props }, ref) => {
    const { checked } = React.useContext(CheckboxContext);
    if (!forceMount && !checked) return null;
    return (
      <span
        ref={ref}
        data-state={checked ? 'checked' : 'unchecked'}
        className={className}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        {...props}
      >
        {children}
      </span>
    );
  },
);
Indicator.displayName = 'WebCheckboxIndicator';

type RootRef = HTMLButtonElement;
type IndicatorRef = HTMLSpanElement;

export type { IndicatorProps, IndicatorRef, RootProps, RootRef };
export { Indicator, Root };
