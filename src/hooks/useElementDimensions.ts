import { useState, useCallback } from "react";
import useCallbackRef from "./useCallbackRef";

const useElementDimensions = (hideInitially = false, showTimeout = 1000) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Can't use useEffect because a ref can't be a dependency therefore it's imposible to be notified about mutations when the ref changes
  // For measuring nodes the recommended way is using useCallback
  // https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
  const elementRef = useCallbackRef(
    useCallback((node: HTMLElement) => {
      if (node !== null) {
        if (hideInitially) {
          node.style.visibility = "hidden";
          node.style.position = "absolute";

          setTimeout(() => {
            node.style.visibility = "visible";
            node.style.position = "relative";
          }, showTimeout);
        }

        const observer = new ResizeObserver(([entry]) => {
          const target = entry.target as HTMLElement;

          setDimensions({
            width: target.offsetWidth,
            height: target.offsetHeight,
          });
        });

        observer.observe(node);

        return () => {
          observer.unobserve(node);
        };
      } else {
        return;
      }
    }, [])
  );

  return { elementRef, dimensions };
};

export default useElementDimensions;
