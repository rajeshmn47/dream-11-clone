export function showName(name) {
  let x = name?.split(" ");
  if (x.length > 1) {
    const a = name?.split(" ")[0].charAt(0).toUpperCase();
    const b = name?.split(" ")[1];
    return `${a} ${b}`;
  } else {
    return name;
  }
}
