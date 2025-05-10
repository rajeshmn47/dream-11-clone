export function getImgurl(id, name) {
  console.log(id, name, 'id&name')
  try {
    if (id && name) {
      const k = 'https://www.cricbuzz.com/a/img/v1/152x152/i1/';
      const a = `c${id}/`;
      const b = `${name.split(' ').join('-').toLowerCase()}.jpg`;
      return k + a + b;
    }
    else {
      return "abcd";
    }
  } catch (e) {
    return 'nothing';
  }
}

export function checkwk(p) {
  if (p == 'wicketkeeper' || p == 'wk-batsman' || p == 'wicket keeper' || p == 'wk-batter') {
    return true;
  }
  return false;
}

export function checkar(p) {
  if (
    p == 'allrounder'
    || p == 'batting allrounder'
    || p == 'bowling allrounder'
    || p == 'all rounder'
  ) {
    return true;
  }
  return false;
}

export function isUnAnnounced(id, players) {
  return true;
}
