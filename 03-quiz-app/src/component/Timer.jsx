import { useState } from "react";
import { useTimer } from "react-timer-hook";

function MyTimer({ expiryTimestamp }) {
  const { seconds, minutes, isRunning } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <section>
      <div className="text-red-500 font-semibold" style={{ fontSize: "25px" }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
    </section>
  );
}

export default function Timer() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 150);

  return (
    <>
      <MyTimer expiryTimestamp={time} />
    </>
  );
}
