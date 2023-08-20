import { getTimeString } from "./helpers";
import { useState, useEffect } from "react";

function RecordsRow(props) {
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <tr>
      <td>{medals[props.index]}</td>
      <td>{props.value}</td>
      <td>{props.new ? "🆕" : ""}</td>
    </tr>
  );
}

function RecordsTable(props) {
  // eslint-disable-next-line
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("time");
    var initialValue = JSON.parse(saved);

    if (initialValue != null && !initialValue.includes(props.time)) {
      initialValue = [...initialValue, props.time]
        .sort((a, b) => a - b)
        .filter((_, index) => index < 3);

      initialValue = initialValue.map(function (el) {
        return {
          time: el,
          new: el === props.time ? true : false,
        };
      });
    } else {
      initialValue = [
        {
          time: props.time,
          new: true,
        },
      ];
    }

    return initialValue;
  });

  useEffect(() => {
    var times = records.map((el) => el.time);
    localStorage.setItem("time", JSON.stringify(times));
  }, [records]);

  var recordsRows = records.map((record, index) => (
    <RecordsRow
      key={index}
      value={getTimeString(record.time)}
      index={index}
      new={record.new}
    ></RecordsRow>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th colSpan="2">Fastest hatch 🐤💨</th>
        </tr>
      </thead>
      <tbody>{recordsRows}</tbody>
    </table>
  );
}

export default RecordsTable;
