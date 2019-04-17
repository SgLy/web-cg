const padZero = (s: string, n: number) => {
  return Array(n - s.length).fill('0').join('') + s;
};

const cut = (s: string, n: number) => {
  return s.substr(s.length - n);
};

const ensureDigits = (a: number, n: number) => {
  const s = a.toString();
  return padZero(cut(s, n), n);
};

export default (d: Date, pattern: string) => {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const day = d.getDay();
  const hour = d.getHours();
  const minute = d.getMinutes();
  const second = d.getSeconds();
  const table: { [key: string]: string } = {
    YYYY: ensureDigits(year, 4),
    YY: ensureDigits(year, 2),
    MM: ensureDigits(month, 2),
    M: month.toString(),
    DD: ensureDigits(date, 2),
    D: date.toString(),
    HH: ensureDigits(hour, 2),
    H: hour.toString(),
    mm: ensureDigits(minute, 2),
    m: minute.toString(),
    SS: ensureDigits(second, 2),
    S: minute.toString(),
  };
  return pattern.replace(/[a-zA-Z]+/g, s => {
    return s in table ? table[s] : s;
  });
};
