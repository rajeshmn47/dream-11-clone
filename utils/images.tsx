export function getImgurl(id:string, name:string) {
    try {
      const k = "https://www.cricbuzz.com/a/img/v1/152x152/i1/";
      const a = `c${id}/`;
      const b = `${name.split(" ").join("-").toLowerCase()}.jpg`;
      return k + a + b;
    } catch (e) {
      return "nothing";
    }
  }