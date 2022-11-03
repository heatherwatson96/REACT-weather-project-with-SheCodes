import "./App.css";
import Ending from "./Ending";
import LiveWeather from "./LiveWeather";

export default function App() {
  return (
    <div className="App">
      <div className="app-container">
        <div>
          <LiveWeather />
        </div>
        <div>
          <Ending />
        </div>
      </div>
    </div>
  );
}
