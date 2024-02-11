export function checkwk(p:string) {
    if (p == "wicketkeeper" || p == "wk-batsman" || p == "wicket keeper") {
      return true;
    }
    return false;
  }
  
  export function checkar(p:string) {
    if (
      p == "allrounder" ||
      p == "batting allrounder" ||
      p == "bowling allrounder" ||
      p == "all rounder"
    ) {
      return true;
    }
    return false;
  }
  
  export function isUnAnnounced(id:string, players:[]) {
    return true;
  }

  