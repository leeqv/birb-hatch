import { useEffect } from "react";
import { useCountStore, useTimeStore } from "../store";
import GameBox from "./GameBox";
import EndGameBox from "./EndGameBox";

function Main() {
  const pointsNeeded = 15;
  const count = useCountStore((state) => state.count);
  const running = useTimeStore((state) => state.running);
  const time = useTimeStore((state) => state.time);
  const offset = useTimeStore((state) => state.offset);
  const setTime = useTimeStore((state) => state.setTime);
  const setOffset = useTimeStore((state) => state.setOffset);

  useEffect(() => {
    var interval;
    if (running) {
      setOffset(Date.now());
      interval = setInterval(update, 100);
    } else if (!running) {
      clearInterval(interval);
      interval = null;
    }

    function update() {
      var now = Date.now(),
        delta = now - offset;
      setOffset(now);
      setTime(time + delta);
    }

    return () => clearInterval(interval);
  }, [running, offset]);

  return (
    <main className="content">
      {count === pointsNeeded ? (
        <EndGameBox />
      ) : (
        <GameBox pointsNeeded={pointsNeeded} />
      )}
    </main>
  );
}

export default Main;
