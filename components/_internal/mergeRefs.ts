import type { Ref } from 'react';

/** Merges a ref a component needs internally with whatever ref the consumer
 *  forwarded in, so both receive the same DOM node. */
export function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        // RefObject.current is technically read-only from the consumer's
        // perspective, but forwardRef/useRef both hand back a mutable object.
        (ref as { current: T | null }).current = node;
      }
    }
  };
}
