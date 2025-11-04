/**
 * Python2 系の range と同等のリストを返す関数。
 * - createList(stop)
 * - createList(start, stop)
 * - createList(start, stop, step)
 * 
 * 引数は数値として扱われ、小数は切り捨て（Math.trunc）されます。
 * step が 0 の場合は例外を投げます。
 */
const createList = function(...args: number[]): number[] {
  if (args.length === 0) {
    throw new TypeError("createList requires at least 1 argument");
  }

  let start: number, stop: number, step: number;

  if (args.length === 1) {
    start = 0;
    stop = args[0];
    step = 1;
  } else if (args.length === 2) {
    start = args[0];
    stop = args[1];
    step = 1;
  } else {
    start = args[0];
    stop = args[1];
    step = args[2];
  }

  start = Math.trunc(Number(start));
  stop = Math.trunc(Number(stop));
  step = Math.trunc(Number(step));

  if (step === 0) {
    throw new RangeError("createList step must not be 0");
  }

  const result: number[] = [];

  if (step > 0) {
    for (let i = start; i < stop; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > stop; i += step) {
      result.push(i);
    }
  }

  return result;
}

export default createList ;