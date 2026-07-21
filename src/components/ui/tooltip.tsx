"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import { cn } from "@/lib/utils"

const Tooltip = TooltipPrimitive.Root

/**
 * The element the tooltip is attached to. Renders as an inline `<span>`
 * (not the primitive's default `<button>`) with `tabIndex={0}` so it's
 * reachable by keyboard without introducing a nested interactive control —
 * this matters because triggers are typically field labels that already
 * live inside a native `<label for=...>`, and a nested `<button>` would
 * swallow clicks that should otherwise reach the labelled control.
 */
function TooltipTrigger({ className, ...props }: TooltipPrimitive.Trigger.Props) {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      render={<span tabIndex={0} />}
      className={cn(
        "cursor-help underline decoration-dotted decoration-muted-foreground/60 underline-offset-2 outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring/50",
        className
      )}
      {...props}
    />
  )
}

interface ITooltipContentProps extends TooltipPrimitive.Popup.Props {
  sideOffset?: TooltipPrimitive.Positioner.Props["sideOffset"]
  side?: TooltipPrimitive.Positioner.Props["side"]
  align?: TooltipPrimitive.Positioner.Props["align"]
}

function TooltipContent({ className, sideOffset = 6, side, align, children, ...props }: ITooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner sideOffset={sideOffset} side={side} align={align}>
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "z-50 max-w-xs text-balance rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md",
            className
          )}
          {...props}
        >
          {children}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent }
