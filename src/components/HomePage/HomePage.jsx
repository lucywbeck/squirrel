import AdventurePage from "../AdventurePage/AdventurePage"
import TimeLeft from "../TimeLeft/TimeLeft"
import GoBar from "../GoBar/GoBar"
import './HomePage.css'
import WaypointMap from "../WaypointMap/WaypointMap";

export default function HomePage() {
    return (
        <>
      <TimeLeft />
      <div style={{pointerEvents:"none"}}>
        <WaypointMap page="home"/>
      </div>
      <div className="main">
        <AdventurePage />
      </div>
      <GoBar/>
        </>
    )
}