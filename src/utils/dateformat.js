import moment from 'moment';

const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const value = '';
export function getDisplayDate(date, sc, d) {
  const today = new Date(d);
  const current = new Date(date);
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  current.setHours(0);
  current.setMinutes(0);
  current.setSeconds(0);
  current.setMilliseconds(0); // month - 1 because January == 0
  const diff = current.getTime() - today.getTime(); // get the difference between today(at 00:00:00) and the date
  if (current.getTime() == today.getTime()) {
    if (sc) {
      const a = moment(date).format('HH:mm a');
      return `Today, ${a}`;
    }
    return 'Today';
  }
  if (Math.abs(diff) < 24 * 60 * 60 * 1000 * 2 && diff > 0) {
    const a = moment(date).format('HH:mm a');
    return `Tommorrow, ${a}`;
  }
  if (Math.abs(diff) < 24 * 60 * 60 * 1000 * 2 && diff < 0) {
    const a = moment(date).format('HH:mm a');
    return `Yesterday, ${a}`;
  }
  if (
    today.getDate() - current.getDate() < 7
    && today.getMonth() == current.getMonth()
  ) {
    return moment(date).format('DD MMM, HH:mm a'); // or format it what ever way you want
  }
  return moment(date).format('DD MMM, HH:mm a');
}

export function sameDayorNot(a, b) {
  const first = new Date(a);
  const second = new Date(b);
  if (
    first.getDate() == second.getDate()
    && first.getDay() == second.getDay()
  ) {
    return true;
  }
}

export function isTommorrow(a, b) {
  const first = new Date(a);
  const second = new Date(b);
  if (
    first.getDate() == second.getDate() - 1
    && first.getDay() == second.getDay() - 1
    && first.getMonth() == second.getMonth()
  ) {
    return true;
  }
}

export function hoursRemaining(date, i, d) {
  const a = new Date(d?.getTime());
  const b = new Date(date);
  const c = Math.floor(
    b.getTime() / (60 * 60 * 1000) - a.getTime() / (60 * 60 * 1000),
  );
  const z = b.getTime() / (60 * 60 * 1000) - a.getTime() / (60 * 60 * 1000);
  if (z > 1) {
    const e = getMinutes(z);
    const s = sameDayorNot(new Date(), new Date(date))
      || isTommorrow(new Date(), new Date(date));
    return s ? `${c}h ${e}m` : null;
  }
  let diff = z % (1000 * 60 * 60);
  const mi = (diff * 60).toString().split('.')[0];
  const min = Math.floor(diff / 60);
  diff %= 1000 * 60;
  const sec = 60 - new Date(d).getSeconds(Math.floor(diff / 1000));
  diff %= 1000;
  if (parseInt(mi) < 0) {
    return 'delayed';
  } if (mi && sec) {
    return `${mi}m ${sec}s`;
  }
}

function getMinutes(x) {
  let a = `.${Math.floor(x.toString().split('.')[1])}`;
  a = Math.floor(parseFloat(a) * 60);
  return a;
}

export function setshow(d) {
  const a = d;
  const k = [];
  const j = [];
  const fall = a?.length > 0 && a?.forEach((b) => k.push(b.split('(')));
  k.forEach((element, index) => {
    if (index % 2 == 1) {
      j[index - 1] = { over: element[0].replace(')', ''), ...j[index - 1] };
    } else {
      j[index] = {
        fall: element[0],
        score: element[1]?.replace(')', ''),
        ...j[index],
      };
    }
  });
  const ox = j.filter((c) => c);
  return ox;
}
