export function playedlm(arr, p) {
  //console.log(arr, p, 'checkplayed')
  const exists = arr.find((f) => f.playerId == p.playerId);
  console.log(p.playerId,'exists')
  if (exists) {
    return true;
  }
  return false;
}
