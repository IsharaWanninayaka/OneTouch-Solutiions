import React, { useState, useEffect, useRef } from "react";

function CountUp({
  end,
  decimals = 0,
  duration = 3200,
  suffix = "",
  prefix = "",
  trigger = true,
  className = "",
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    if (!trigger) {
      setCount(0);
      return;
    }

    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth cubic-bezier ease-out curve (starts briskly and decelerates visibly)
      // This allows the numbers to tick upward clearly and visibly for the user
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeOut * end;

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    // 700ms delay so count begins right as the slower hero text glides in
    const startTimeout = setTimeout(() => {
      animationFrameId = window.requestAnimationFrame(step);
    }, 700);

    return () => {
      clearTimeout(startTimeout);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [trigger, end, duration]);

  return (
    <span ref={elementRef} className={`tabular-nums ${className}`}>
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export default CountUp;
