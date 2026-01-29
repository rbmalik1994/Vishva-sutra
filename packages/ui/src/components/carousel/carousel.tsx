'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

interface CarouselContextValue {
  currentIndex: number;
  itemCount: number;
  scrollTo: (index: number) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  orientation: 'horizontal' | 'vertical';
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a Carousel');
  }
  return context;
}

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  opts?: {
    loop?: boolean;
    autoplay?: boolean;
    autoplayInterval?: number;
  };
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = 'horizontal',
      opts = {},
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { loop = false, autoplay = false, autoplayInterval = 3000 } = opts;
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [itemCount, setItemCount] = React.useState(0);

    const canScrollPrev = loop || currentIndex > 0;
    const canScrollNext = loop || currentIndex < itemCount - 1;

    const scrollTo = React.useCallback(
      (index: number) => {
        if (loop) {
          setCurrentIndex(((index % itemCount) + itemCount) % itemCount);
        } else {
          setCurrentIndex(Math.max(0, Math.min(index, itemCount - 1)));
        }
      },
      [itemCount, loop]
    );

    const scrollPrev = React.useCallback(() => {
      scrollTo(currentIndex - 1);
    }, [currentIndex, scrollTo]);

    const scrollNext = React.useCallback(() => {
      scrollTo(currentIndex + 1);
    }, [currentIndex, scrollTo]);

    React.useEffect(() => {
      if (autoplay && itemCount > 1) {
        const interval = setInterval(scrollNext, autoplayInterval);
        return () => clearInterval(interval);
      }
    }, [autoplay, autoplayInterval, scrollNext, itemCount]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (orientation === 'horizontal') {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            scrollPrev();
          } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            scrollNext();
          }
        } else {
          if (event.key === 'ArrowUp') {
            event.preventDefault();
            scrollPrev();
          } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            scrollNext();
          }
        }
      },
      [orientation, scrollPrev, scrollNext]
    );

    return (
      <CarouselContext.Provider
        value={{
          currentIndex,
          itemCount,
          scrollTo,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          orientation,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn('relative', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === CarouselContent) {
              return React.cloneElement(child as React.ReactElement<{ setItemCount?: (count: number) => void }>, {
                setItemCount,
              });
            }
            return child;
          })}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

interface CarouselContentProps extends React.HTMLAttributes<HTMLDivElement> {
  setItemCount?: (count: number) => void;
}

const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, setItemCount, children, ...props }, ref) => {
    const { currentIndex, orientation } = useCarousel();

    React.useEffect(() => {
      setItemCount?.(React.Children.count(children));
    }, [children, setItemCount]);

    return (
      <div ref={ref} className="overflow-hidden" {...props}>
        <div
          className={cn(
            'flex transition-transform duration-300 ease-in-out',
            orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
            className
          )}
          style={{
            transform:
              orientation === 'horizontal'
                ? `translateX(-${currentIndex * 100}%)`
                : `translateY(-${currentIndex * 100}%)`,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollPrev, canScrollPrev, orientation } = useCarousel();

  return (
    <button
      ref={ref}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      className={cn(
        'absolute h-8 w-8 rounded-full border bg-background flex items-center justify-center disabled:opacity-50',
        orientation === 'horizontal'
          ? '-left-12 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      aria-label="Previous slide"
      {...props}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollNext, canScrollNext, orientation } = useCarousel();

  return (
    <button
      ref={ref}
      disabled={!canScrollNext}
      onClick={scrollNext}
      className={cn(
        'absolute h-8 w-8 rounded-full border bg-background flex items-center justify-center disabled:opacity-50',
        orientation === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      aria-label="Next slide"
      {...props}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
});
CarouselNext.displayName = 'CarouselNext';

const CarouselDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { currentIndex, itemCount, scrollTo } = useCarousel();

  return (
    <div
      ref={ref}
      className={cn('flex justify-center gap-2 mt-4', className)}
      {...props}
    >
      {Array.from({ length: itemCount }).map((_, index) => (
        <button
          key={index}
          onClick={() => scrollTo(index)}
          className={cn(
            'h-2 w-2 rounded-full transition-colors',
            index === currentIndex ? 'bg-primary' : 'bg-muted'
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
});
CarouselDots.displayName = 'CarouselDots';

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  useCarousel,
};
export type { CarouselProps };
