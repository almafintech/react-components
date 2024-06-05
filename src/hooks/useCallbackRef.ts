import { useRef, useCallback } from "react";
import { MutableRefObject } from "react";

// This is a modified useCallback hook that adds a cleanup function (like useEffect does)
const useCallbackRef = (
  rawCallback: (node: HTMLElement) => (() => void) | undefined
) => {
  const cleanupRef: MutableRefObject<null | (() => void) | undefined> =
    useRef(null);
  const callback = useCallback(
    (node: any) => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }

      if (node) {
        cleanupRef.current = rawCallback(node);
      }
    },
    [rawCallback]
  );

  return callback;
};

export default useCallbackRef;

// Usage

// const callback = useCallbackRef(useCallback((node) => {
//     node.addEventListener(...);
//     return () => {
//       node.removeEventListener(...);
//     };
//   }, []));
