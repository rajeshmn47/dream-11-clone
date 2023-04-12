import moment from "moment";
const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

let value = "";
export function getDisplayDate(date, sc) {
  let today = new Date();
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
  } else if (Math.abs(diff) <= 24 * 60 * 60 * 1000 * 3) {
    let a = moment(date).format("HH:mm a");
    return "Tommorrow, " + a;
  } else if (
    today.getDate() - current.getDate() < 7 &&
    today.getMonth() == current.getMonth()
  ) {
    console.log(current.getDay() - 2, "day");
    console.log(moment(date).format("DD MM"));
    return moment(date).format("DD MMM, HH:MM a"); // or format it what ever way you want
  } else {
    return moment(date).format("DD MMM, HH:MM a");
  }
}

export function sameDayorNot(a, b) {
  let first = new Date(a);
  let second = new Date(b);
  console.log(
    first.getDate(),
    second.getDate(),
    first.getDay(),
    second.getDay(),
    "sameday"
  );
  if (
    first.getDate() == second.getDate() &&
    first.getDay() == second.getDay()
  ) {
    return true;
  } else {
    console.log(first.getDate(), second.getDate(), "etdate");
  }
}

export function isTommorrow(a, b) {
  let first = new Date(a);
  let second = new Date(b);
  if (
    first.getDate() == second.getDate() - 2 &&
    first.getDay() == second.getDay() - 2 &&
    first.getMonth() == second.getMonth()
  ) {
    console.log(
      first.getDate(),
      second.getDate() - 2,
      first.getDay(),
      second.getDay() - 2,
      "tommorrow"
    );
    return true;
  } else {
    console.log(first.getDate(), second.getDate(), "etdate");
  }
}

export function hoursRemaining(date) {
  let a = new Date();
  let b = new Date(date);
  let c = Math.floor(
    b.getTime() / (60 * 60 * 1000) - a.getTime() / (60 * 60 * 1000)
  );
  let z = b.getTime() / (60 * 60 * 1000) - a.getTime() / (60 * 60 * 1000);
  let e = getMinutes(z);
  console.log(
    b.getTime() / (24 * 60 * 60 * 1000) -
      (a.getTime() / (24 * 60 * 60 * 1000), "hoursremain")
  );
  let s =
    sameDayorNot(new Date(), new Date(date)) ||
    isTommorrow(new Date(), new Date(date));
  return s ? `${c}h ${e}m` : null;
}

function getMinutes(x) {
  let a = "." + Math.floor(x.toString().split(".")[1]);
  a = Math.floor(parseFloat(a) * 60);
  console.log(a, a[0], a[1], "getmins");
  return a;
}
