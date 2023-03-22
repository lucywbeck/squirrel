import React, { useEffect, useState } from "react";
import { useDbData } from "../../utilities/firebase";
import { Subject } from 'rxjs';
import './TimeLeft.css'
import ProgressTimer from 'react-progress-bar-timer';

const TimerComponent = () => (
    
<ProgressTimer
  direction="left"
  duration={500}
  label="3 hours left"
  onFinish={function noRefCheck(){}}
  rootRounded
  started={true}
  variant="fill"
 />
  );

// 
const subject = new Subject()
export const remainingTimeService = {
    setRemainingTime: t => subject.next({ value: t }),
    clearRemainingTime: () => subject.next(),
    getRemainingTime: () => subject.asObservable()
}

export default function TimeLeft() {
    const [data, error] = useDbData();
    const [remainingTime, setRemainingTime] = useState()
    const user = "user1"

    useEffect(() => {
        if (data) {
            let locations_ = []
            if (data.users[user]["adventure"]["locations"]) {
                locations_ = data.users[user]["adventure"]["locations"];
            }

            setTime(data, locations_);
        }
    }, [data])

    useEffect(() => {
        remainingTimeService.setRemainingTime(remainingTime)
    }, [remainingTime])

    if (!data) {
        return <h1>Loading</h1>
    } 

    const setTime = (data, locations) => {
        const startTime = Date.parse(data.users[user]["start time"])
        const endTime = Date.parse(data.users[user]["end time"])
        const freeTime = Math.abs(startTime - endTime) / 36e5;

         // calculate remaining time
         let currRemainingTime = freeTime;
         locations.forEach(location => {
             if (location["selected"] && location.suggestedTime) currRemainingTime -= location.suggestedTime;
         })

         setRemainingTime(currRemainingTime)
    }
    
    return (
        <div className="time-left-banner">
            <div className="start-adventure">Build Your Adventure</div>
            <div className="time-left">{remainingTime} Hours Left</div>
        </div>
    )
}