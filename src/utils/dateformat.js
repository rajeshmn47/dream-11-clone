import moment from "moment";
const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

let value = "";
export function getDisplayDate(date, sc, d) {
  let today = new Date(d);
  let current = new Date(date);
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  current.setHours(0);
  current.setMinutes(0);
  current.setSeconds(0);
  current.setMilliseconds(0); // month - 1 because January == 0
  let diff = current.getTime() - today.getTime(); // get the difference between today(at 00:00:00) and the date
  if (current.getTime() == today.getTime()) {
    if (sc) {
      let a = moment(date).format("HH:mm a");
      return "Today, " + a;
    } else {
      return "Today";
    }
  } else if (Math.abs(diff) < 24 * 60 * 60 * 1000 * 2) {
    console.log(Math.abs(diff) < 24 * 60 * 60 * 1000 * 2, "tomm");
    let a = moment(date).format("HH:mm a");
    return "Tommorrow, " + a;
  } else if (
    today.getDate() - current.getDate() < 7 &&
    today.getMonth() == current.getMonth()
  ) {
    return moment(date).format("DD MMM, HH:MM a"); // or format it what ever way you want
  } else {
    return moment(date).format("DD MMM, HH:MM a");
  }
}

export function sameDayorNot(a, b) {
  let first = new Date(a);
  let second = new Date(b);
  if (
    first.getDate() == second.getDate() &&
    first.getDay() == second.getDay()
  ) {
    return true;
  } else {
  }
}

export function isTommorrow(a, b) {
  let first = new Date(a);
  let second = new Date(b);
  if (
    first.getDate() == second.getDate() - 1 &&
    first.getDay() == second.getDay() - 1 &&
    first.getMonth() == second.getMonth()
  ) {
    return true;
  } else {
  }
}

export function hoursRemaining(date, i, d) {
  console.log(date, i, d, "yui");
  let a = new Date(d?.getTime());
  let b = new Date(date);
  let c = Math.floor(
    b.getTime() / (60 * 60 * 1000) - a.getTime() / (60 * 60 * 1000)
  );
  let z = b.getTime() / (60 * 60 * 1000) - a.getTime() / (60 * 60 * 1000);
  if (z > 1) {
    let e = getMinutes(z);
    console.log(
      b.getTime() / (24 * 60 * 60 * 1000) -
        (a.getTime() / (24 * 60 * 60 * 1000), "hoursremain")
    );
    let s =
      sameDayorNot(new Date(), new Date(date)) ||
      isTommorrow(new Date(), new Date(date));
    return s ? `${c}h ${e}m` : null;
  } else {
    let diff = z % (1000 * 60 * 60);
    var mi=(diff*60).toString().split('.')[0]
    var min = Math.floor(diff / (  60));
    diff = diff % (1000 * 60);
    var sec = new Date(d).getSeconds(Math.floor(diff / 1000));
    diff = diff % 1000;
    return `${mi}m ${sec}s`;
  }
}

function getMinutes(x) {
  let a = "." + Math.floor(x.toString().split(".")[1]);
  a = Math.floor(parseFloat(a) * 60);
  console.log(a, a[0], a[1], "getmins");
  return a;
}

export function setshow(d) {
  let a = d;
  let k = [];
  let j = [];
  const fall = a?.length > 0 && a?.forEach((b) => k.push(b.split("(")));
  console.log(k, "fall");
  k.forEach((element, index) => {
    if (index % 2 == 1) {
      j[index - 1] = { over: element[0].replace(")", ""), ...j[index - 1] };
    } else {
      j[index] = {
        fall: element[0],
        score: element[1]?.replace(")", ""),
        ...j[index],
      };
    }
  });
  console.log(j, "j");
  let ox = j.filter((c) => c);
  return ox;
}
