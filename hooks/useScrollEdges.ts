import { useEffect, useState } from "react";
import type { RefObject } from "react";

// Whether there is hidden content to the left/right of a horizontally scrollable element
export function useScrollEdges(ref: RefObject<HTMLElement | null>) {
  const [edges, setEdges] = useState({ left: false, right: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      // 1px tolerance for fractional scroll positions on high-DPI screens
      const left = el.scrollLeft > 1;
      const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
      setEdges((prev) =>
        prev.left === left && prev.right === right ? prev : { left, right }
      );
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    // Also covers the <details> being expanded, which resizes the element from 0
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [ref]);

  return edges;
}
