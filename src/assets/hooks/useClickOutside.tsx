import { useEffect } from 'react';

const useClickOutSide = (setActive: Function,ref:any) => {
  useEffect(() => {
    document.body.addEventListener("mousedown", (e) => {
      //@ts-ignore
      if (!ref?.current!.contains(e.target)) {
        setActive(0);
      }
    });
    return document.body.removeEventListener("mousedown", (e) => {
      //@ts-ignore
      if (!ref?.current!.contains(e.target)) {
        setActive(0);
      }
    });
  }, []);
}

export default useClickOutSide;