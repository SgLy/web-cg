const padZero = (a: number, n: number) => {
  const s = a.toString();
  return Array(n - s.length).fill('0').join('') + s;
};

export default (msec: number) => {
  if (msec < 1000) return `0.${padZero(msec, 3)} 秒`;
  const sec = Math.floor(msec / 1000);
  if (sec < 60) return `${sec} 秒`;
  let min = Math.floor(sec / 60);
  let hour = Math.floor(min / 60);
  if (hour === 0) return `${min} 分钟`;
  min -= hour * 60;
  if (hour < 24) return `${hour} 小时 ${min} 分钟`;
  const day = Math.floor(hour / 24);
  hour -= day * 24;
  if (day < 30) return `${day} 天 ${hour} 小时`;
  return '大于一个月';
};
