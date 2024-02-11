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

  export function getImageName(id: string, match: any) {
    let players: any[] = [...match.teamAwayPlayers, ...match.teamHomePlayers]
    let player: any = {};
    player = players.find((p: any) => p.playerId == id)
    let url: string = getImgurl(player?.image, player?.playerName)
    return url;
}