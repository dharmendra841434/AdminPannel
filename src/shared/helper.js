export const isEmptyObject = (obj) => {
  if (typeof obj === "object" && obj != null) {
    return Object.keys(obj).length >= 1 ? false : true;
  }
  return true;
};

export const convertSecondsTo = (sec) => {
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - hours * 3600) / 60);
  let seconds = sec - hours * 3600 - minutes * 60;
  seconds = Math.round(seconds * 100) / 100;
  if (hours === 0) {
    let result = minutes < 10 ? minutes : minutes;
    result += ":" + (seconds < 10 ? "0" + seconds : seconds);
    return result;
  } else {
    let result = hours < 10 ? "" + hours : hours;
    result += ":" + (minutes < 10 ? "0" + minutes : minutes);
    result += ":" + (seconds < 10 ? "0" + seconds : seconds);
    return result;
  }
};

export const buttonName = (str) => {
  const num = parseInt(str);
  if (num < 30) return "red"; //{ class: "red", message: "Плохо" };
  if (num > 30 && num < 300) return "indigo"; // { class: "indigo", message: "Хорошо" };
  if (num > 300) return "green"; //{ class: "green", message: "Отлично" };
};
export const strClip = (str) => {
  return str.split(" ")[1].slice(0, 5);
};

export const dateBefore = (duration) => {
  const date = new Date();
  const today = new Date().toISOString().split("T")[0];
  const newDate = date.setDate(date.getDate() - duration);
  const dateBefore = new Date(newDate).toISOString().split("T")[0];
  return {
    today: today,
    xDaysBefore: dateBefore,
  };
};
