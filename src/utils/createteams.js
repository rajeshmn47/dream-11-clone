export function playedlm(arr, p) {
  const exists = arr.find((f) => f.playerId == p.playerId);
  if (exists) {
    return true;
  }
  return false;
}
