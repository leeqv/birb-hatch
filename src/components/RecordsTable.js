import { getTimeString } from "./helpers";
import { useEffect } from "react";
import { useRecordStore } from "../store";

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

function RecordsTable() {
  const records = useRecordStore((state) => state.records());

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
