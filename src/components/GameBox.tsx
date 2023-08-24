import { useCountStore, useTimeStore } from "../store";

function GameBox({ pointsNeeded }: { pointsNeeded: number }) {
  const count = useCountStore((state) => state.count);
  const time = useTimeStore((state) => state.time);
  const running = useTimeStore((state) => state.running);
  const increaseCount = useCountStore((state) => state.increaseCount);
  const setRunning = useTimeStore((state) => state.setRunning);

  function handleEggBtnClick() {
    increaseCount();

    if (count === 0) {
      setRunning(true);
    }
    if (count === pointsNeeded - 1) {
      setRunning(false);
    }
  }

  return (
    <>
      <button
        onClick={handleEggBtnClick}
        className="content__egg-btn btn btn-outline-warning"
      >
        🥚
      </button>
      {running && (
        <>
          <span className="content__counter">{count}</span>
          <span className="timer">time elapsed: {time}</span>
        </>
      )}
    </>
  );
}

export default GameBox;
