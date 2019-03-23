export default function<T>(intervalMilliSeconds: number, func: (...args: any[]) => T) {
  let lastTimer: number;
  return function(this: any, ...args: any[]) {
    if (lastTimer !== undefined) clearTimeout(lastTimer);
    const handler: TimerHandler = () => func.call(this, args);
    lastTimer = setTimeout(handler, intervalMilliSeconds);
  };
}
