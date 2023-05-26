export function showName(name) {
  const a = name?.split(" ")[0].charAt(0).toUpperCase();
  const b = name?.split(" ")[1];
  return `${a} ${b}`;
}
