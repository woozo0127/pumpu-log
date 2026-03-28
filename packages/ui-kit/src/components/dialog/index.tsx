import * as React from 'react';
import * as DialogPrimitive from '@rn-primitives/dialog';
import { View } from 'react-native';
import { cn } from '~/lib/utils';
import { Button, buttonTextVariants } from '../button';
import { Text } from '../text';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
  DialogPrimitive.OverlayRef,
  DialogPrimitive.OverlayProps & { className?: string }
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn('bg-black/50', className)}
    style={{ position: 'fixed' as any, top: 0, right: 0, bottom: 0, left: 0 }}
    {...props}
  />
));
DialogOverlay.displayName = 'DialogOverlay';

const DialogContent = React.forwardRef<
  DialogPrimitive.ContentRef,
  DialogPrimitive.ContentProps & { className?: string; children?: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'w-[320px] bg-card rounded-md p-2xl border border-border-subtle',
        className
      )}
      style={{
        position: 'fixed' as any,
        top: '50%',
        left: '50%',
        transform: [{ translateX: -160 }, { translateY: -100 }],
      }}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = 'DialogContent';

const DialogHeader = React.forwardRef<
  React.ComponentRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('gap-sm mb-lg', className)}
    {...props}
  />
));
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = React.forwardRef<
  React.ComponentRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('flex-row justify-end gap-sm mt-lg', className)}
    {...props}
  />
));
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  DialogPrimitive.TitleRef,
  DialogPrimitive.TitleProps & { className?: string }
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
));
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef<
  DialogPrimitive.DescriptionRef,
  DialogPrimitive.DescriptionProps & { className?: string }
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-foreground-secondary', className)}
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';

// Convenience AlertDialog component
interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  title: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  variant?: 'default' | 'destructive';
}

function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  cancelText = '취소',
  confirmText = '확인',
  onConfirm,
  variant = 'default',
}: AlertDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" size="sm">
              <Text className={cn(buttonTextVariants({ variant: 'secondary' }), 'text-sm')}>
                {cancelText}
              </Text>
            </Button>
          </DialogClose>
          <Button
            variant={variant === 'destructive' ? 'destructive' : 'default'}
            size="sm"
            onPress={onConfirm}
          >
            <Text
              className={cn(
                buttonTextVariants({
                  variant: variant === 'destructive' ? 'destructive' : 'default',
                }),
                'text-sm'
              )}
            >
              {confirmText}
            </Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  AlertDialog,
};
export type { AlertDialogProps };
