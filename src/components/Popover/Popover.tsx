import { arrow, FloatingPortal, offset, type Placement, shift, useFloating } from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { ElementType, useId, useRef, useState } from 'react'

interface PopoverProps {
  children: React.ReactNode
  popover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}

export default function Popover({
  children,
  popover,
  className,
  as: Element = 'div',
  initialOpen,
  placement = 'bottom-end'
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, strategy, refs, middlewareData } = useFloating({
    middleware: [shift(), offset(13), arrow({ element: arrowRef })],
    placement: placement
  })
  const id = useId()

  const showPopOver = () => {
    setIsOpen(true)
  }
  const hidePopOver = () => {
    setIsOpen(false)
  }
  return (
    <Element className={className} ref={refs.setReference} onMouseEnter={showPopOver} onMouseLeave={hidePopOver}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.3 }}
            >
              <span
                ref={arrowRef}
                className='absolute translate-y-[-19px] border-[10px] border-x-transparent border-t-transparent border-b-color-border-primary-light'
                style={{
                  left: middlewareData.arrow?.x,
                  top: -1
                }}
              />
              <span
                ref={arrowRef}
                className='absolute translate-y-[-19px] border-[10px] border-x-transparent border-t-transparent border-b-color-bg-dark-primary'
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />
              {popover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
