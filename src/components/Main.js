import { useState, useEffect } from "react";
import RecordsTable from "./RecordsTable";
import { getTimeString } from "./helpers";

function Main() {
    const pointsNeeded = 15;

    /** STOPWATCH */
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [offset, setOffset] = useState();
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
            setTime(time => time + delta());
        }
        function delta() {
            var now = Date.now(),
                d = now - offset;
            setOffset(now);
            return d;
        }

        return () => clearInterval(interval);
    }, [running, offset]);

    /** COUNTER */
    const [count, setCount] = useState(0);

    function addPoints() {
        setCount(() => count + 1);
    }

    function resetCounter() {
        setCount(0);
    }

    /** BUTTON HANDLERS */
    function handleResetBtn() {
        resetCounter();
        setTime(0);
    }

    function handleEggBtnClick() {
        addPoints();
        if (count === 0) {
            setRunning(true);
        }
        if (count === pointsNeeded - 1) {
            setRunning(false);
        }
    }

    /** TEMPLATES */
    const endGameTemplate = (
        <>
            <span className="egg-btn chick-btn">
                🐣
            </span>
            <p className="counter">
                Good job! You helped birb hatch in {getTimeString(time)} 👏
            </p>

            <button className="reset-btn btn btn-warning" onClick={handleResetBtn}>
                hatch another egg
            </button>

            <RecordsTable time={time}/>
        </>
    );

    const startedGameTemplate = (
        <>
            <span className="counter">
                {count}
            </span>
            <span className="timer">time elapsed: {time}</span>
        </>
    )

    const inGameTemplate = (
        <>
            <button onClick={handleEggBtnClick} className="egg-btn btn btn-outline-warning">
                🥚
            </button>
            {(running) ? startedGameTemplate : null}
        </>
    )

    return (
        <main className="app-main">
            {(count === pointsNeeded) ? endGameTemplate : inGameTemplate}
        </main>
    );
}

export default Main;