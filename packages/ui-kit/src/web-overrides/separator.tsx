'use client';

// Storybook/web-only implementation of @rn-primitives/separator

import * as React from 'react';

interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  asChild?: boolean;
}

const Root = React.forwardRef<HTMLDivElement, RootProps>(
  ({ orientation = 'horizontal', decorative = true, className, style, asChild: _asChild, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role={decorative ? 'presentation' : 'separator'}
        aria-orientation={orientation}
        className={className}
        style={style}
        {...props}
      />
    );
  }
);
Root.displayName = 'WebSeparatorRoot';

type RootRef = HTMLDivElement;

export { Root };
export type { RootProps, RootRef };
