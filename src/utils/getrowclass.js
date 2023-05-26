export function getrowClass(allplayers, dreamteam, name) {
  const q = both(allplayers, dreamteam, name)
    ? "prime"
    : allplayers.find((k) => k.playerName == name)
    ? "even"
    : dreamteam.find((p) => p.playerName == name)
    ? "sikh"
    : "odd";
  return q;
}

function both(allplayers, dreamteam, name) {
  const q = allplayers.find((k) => k.playerName == name);
  const r = dreamteam.find((p) => p.playerName == name);
  return q && r;
}
