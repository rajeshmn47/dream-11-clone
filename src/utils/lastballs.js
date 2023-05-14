export function showBalls(balls) {
  console.log(balls, "balls");
  let a = balls?.arr?.split("|")[2];
  let arr = a?.split(" ");
  let rem = 6 - arr?.length;
  if (arr?.length > 0) {
    for (let i = 0; i < rem + 1; i++) {
      arr.push("E");
    }
  }
  return arr;
}
