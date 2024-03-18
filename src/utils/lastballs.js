export function showBalls(balls) {
  const k = balls?.arr?.split('|');
  let a;
  if (k.length < 2) {
    a = balls?.arr?.split('|')[0];
  } else if (k.length < 3) {
    a = balls?.arr?.split('|')[1];
  } else {
    a = balls?.arr?.split('|')[2];
  }
  let arr = a?.split(' ');
  arr = arr.filter((a) => !(a == ''));
  const rem = 6 - arr?.length;
  if (rem > 0) {
    for (let i = 0; i < rem; i++) {
      arr.push('E');
    }
  }
  return arr;
}
