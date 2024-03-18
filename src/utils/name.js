export function showName(name) {
  const x = name?.split(' ');
  if (x.length > 1) {
    const a = name?.split(' ')[0].charAt(0).toUpperCase();
    const b = name?.split(' ')[1];
    return `${a} ${b}`;
  }
  return name;
}
