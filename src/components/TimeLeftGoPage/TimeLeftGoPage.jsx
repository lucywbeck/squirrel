import React, { useEffect, useState, useMemo } from "react";
import { useDbData } from "../../utilities/firebase";
import { Subject } from "rxjs";
import "./TimeLeft.css";
import ProgressTimer from "react-progress-bar-timer";

const TimerComponent = () => (
  <ProgressTimer
    direction="left"
    duration={500}
    label="3 hours left"
    onFinish={function noRefCheck() {}}
    rootRounded
    started={true}
    variant="fill"
  />
);

//
const subject = new Subject();
export const remainingTimeService = {
  setRemainingTime: (t) => subject.next({ value: t }),
  clearRemainingTime: () => subject.next(),
  getRemainingTime: () => subject.asObservable(),
};

export default function TimeLeftGoPage() {
  const [duration, setDuration] = useState(0);

  const formattedDuration = useMemo(() => {
    var seconds = Math.floor((duration / 1000) % 60);
    var minutes = Math.floor((duration / (1000 * 60)) % 60);
    var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    seconds = ("0" + seconds).slice(-2)
    minutes = ("0" + minutes).slice(-2)
    hours = ("0" + hours).slice(-2)
    return `${hours}:${minutes}:${seconds}`;
  }, [duration]);

  useEffect(() => {
    const duration = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
    const startTime = Date.now() + duration;
    const interval = setInterval(
      () => setDuration(startTime - Date.now()),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="time-left-banner">
      <div className="time-left">Time to explore <p className="time-duration"> : { formattedDuration}</p> </div>
    </div>
  );
}
