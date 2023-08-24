function getTimeString(ms: number) {
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

  // make sure dict is in descending order of inSeconds
  dict.sort((a, b) => b.inSeconds - a.inSeconds);

  const elapsedTime: Record<string, number> = {
    s: ms / 1000,
  };
  // later will update to something like { s: 0.01, min: 60 }

  dict.forEach((item) => {
    while (elapsedTime.s >= item.inSeconds) {
      elapsedTime.s = elapsedTime.s - item.inSeconds;
      elapsedTime[item.unit] = ~~elapsedTime[item.unit] + 1;
    }
  });

  let timeString = "";
  dict.forEach((item) => {
    if (elapsedTime[item.unit] > 0)
      timeString += `${elapsedTime[item.unit]}${item.unit[0]} `;
  });
  if (elapsedTime.s) timeString += `${elapsedTime.s.toFixed(3)}s`;

  return timeString;
}

export { getTimeString };
