import { getTimeString } from "./helpers";
import { useEffect } from "react";
import { useRecordStore } from "../store";

interface RecordsRowProps {
  index: number;
  value: string;
  new: boolean;
}

function RecordsRow(props: RecordsRowProps) {
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

  interface Record {
    time: number;
    new: boolean;
  }

  useEffect(() => {
    const times = records.map((el: Record) => el.time);
    localStorage.setItem("time", JSON.stringify(times));
  }, [records]);

  const recordsRows = records.map((record: Record, index: number) => (
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
          <th colSpan={2}>Fastest hatch 🐤💨</th>
        </tr>
      </thead>
      <tbody>{recordsRows}</tbody>
    </table>
  );
}

export default RecordsTable;
