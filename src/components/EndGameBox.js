import { useCountStore, useTimeStore } from "../store";
import { getTimeString } from "./helpers";
import RecordsTable from "./RecordsTable";

function EndGameBox() {
  const time = useTimeStore((state) => state.time);
  const resetTime = useTimeStore((state) => state.resetTime);
  const resetCount = useCountStore((state) => state.resetCount);

  function handleResetBtn() {
    resetCount();
    resetTime();
  }

  return (
    <>
      <span className="content__egg-btn content__egg-btn--fin">🐣</span>
      <p className="content__counter">
        Good job! You helped birb hatch in {getTimeString(time)} 👏
      </p>

      <button
        className="content__reset-btn btn btn-warning"
        onClick={handleResetBtn}
      >
        hatch another egg
      </button>

      <RecordsTable />
    </>
  );
}

export default EndGameBox;
