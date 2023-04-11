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
      return moment(date).format("HH:mm");
    } else {
      return "Today";
    }
  } else if (Math.abs(diff) <= 24 * 60 * 60 * 1000) {
    return "Tommorrow";
  } else if (
    today.getDate() - current.getDate() < 7 &&
    today.getMonth() == current.getMonth()
  ) {
    console.log(current.getDay() - 1, "day");
    console.log(moment(date).format("DD MM"));
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
    console.log(first.getDate(), second.getDate(), "etdate");
  }
}
