'use client';

// Storybook/web-only implementation of @rn-primitives/dialog
// Uses @radix-ui/react-dialog directly so NativeWind className works on web

import * as RadixDialog from '@radix-ui/react-dialog';
import * as React from 'react';

// Re-export primitives that don't need wrapping
const Root = RadixDialog.Root;
const Trigger = RadixDialog.Trigger;
const Close = RadixDialog.Close;
const Portal = RadixDialog.Portal;

// Overlay with className support — acts as a centering container
const Overlay = React.forwardRef<
  React.ComponentRef<typeof RadixDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(({ className, ...props }, ref) => (
  <RadixDialog.Overlay
    ref={ref}
    className={className}
    style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    {...props}
  />
));
Overlay.displayName = 'WebDialogOverlay';

// Content with className support
const Content = React.forwardRef<
  React.ComponentRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content> & { style?: Record<string, unknown> }
>(({ className, style: _style, ...props }, ref) => {
  return <RadixDialog.Content ref={ref} className={className} {...props} />;
});
Content.displayName = 'WebDialogContent';

// Title with className support
const Title = React.forwardRef<
  React.ComponentRef<typeof RadixDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(({ className, ...props }, ref) => (
  <RadixDialog.Title ref={ref} className={className} {...props} />
));
Title.displayName = 'WebDialogTitle';

// Description with className support
const Description = React.forwardRef<
  React.ComponentRef<typeof RadixDialog.Description>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(({ className, ...props }, ref) => (
  <RadixDialog.Description ref={ref} className={className} {...props} />
));
Description.displayName = 'WebDialogDescription';

function useRootContext() {
  return { open: false, onOpenChange: () => {} };
}

export { Close, Content, Description, Overlay, Portal, Root, Title, Trigger, useRootContext };
