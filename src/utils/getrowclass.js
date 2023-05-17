export function getrowClass(allplayers, dreamteam, name) {
  let q = both(allplayers, dreamteam, name)
    ? "prime"
    : allplayers.find((k) => {
        return k.playerName == name;
      })
    ? "even"
    : dreamteam.find((p) => {
        return p.playerName == name;
      })
    ? "sikh"
    : "odd";
  return q;
}

function both(allplayers, dreamteam, name) {
  let q = allplayers.find((k) => {
    return k.playerName == name;
  });
  let r = dreamteam.find((p) => {
    return p.playerName == name;
  });
  return q && r;
}
