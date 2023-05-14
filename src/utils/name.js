export function showName(name) {
  let a = name?.split(" ")[0].charAt(0).toUpperCase();
  let b = name?.split(" ")[1];
  return a + " " + b;
}
