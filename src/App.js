import "./App.css";
import Ending from "./Ending";
import LiveWeather from "./LiveWeather";

export default function App() {
  return (
    <div className="App">
      <div>
        <LiveWeather />
      </div>
      <Ending />
    </div>
  );
}
