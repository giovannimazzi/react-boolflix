/* import axios from "axios"; */
import { GiPowerButton } from "react-icons/gi";

export default function App() {
  return (
    <div className="p-3">
      <h1>HELLO WORLD!!!</h1>
      <button className="btn btn-primary d-flex align-items-center gap-2">
        <GiPowerButton className="text-warning fw-bold" />
        BUTTON
      </button>
    </div>
  );
}
