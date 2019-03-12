export default function<T>(n: number, f: (i: number) => T) {
  return Array(n).fill(0).map((_, i) => f(i));
}
