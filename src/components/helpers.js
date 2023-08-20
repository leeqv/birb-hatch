function getTimeString(ms) {
  const dict = [
    {
      unit: "day",
      inSeconds: 3600 * 24,
    },
    {
      unit: "min",
      inSeconds: 60,
    },
    {
      unit: "hour",
      inSeconds: 3600,
    },
  ];
  dict.sort((a, b) => b.inSeconds - a.inSeconds); // make sure dict is in descending order of inSeconds

  var elapsedTime = {
    s: ms / 1000,
  }; // later will update to something like { s: 0.01, min: 60 }
  dict.forEach((item) => {
    while (elapsedTime.s >= item.inSeconds) {
      elapsedTime.s = elapsedTime.s - item.inSeconds;
      elapsedTime[item.unit] = ~~elapsedTime[item.unit] + 1;
    }
  });

  var timeString = "";
  dict.forEach((item) => {
    if (elapsedTime[item.unit] > 0)
      timeString += `${elapsedTime[item.unit]}${item.unit[0]} `;
  });
  if (elapsedTime.s) timeString += `${elapsedTime.s.toFixed(3)}s`;

  return timeString;
}

export { getTimeString };
