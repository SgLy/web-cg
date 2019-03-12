export default function<T>(intervalMilliSeconds: number, func: (...args: any[]) => T) {
  let lastCall = -1;
  return function(this: any, ...args: any[]) {
    const current = Date.now();
    if (current - lastCall < intervalMilliSeconds) return;
    lastCall = current;
    return func.call(this, args);
  };
}
