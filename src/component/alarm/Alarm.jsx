import React, { useEffect } from "react";

export const Alarm = () => {
  useEffect(() => {
    const EventSource = EventSourcePolyfill;
    const eventSource = useRef(null);
  }, []);
  return <div>Alarm</div>;
};
