import "./App.css";
import Routepath from "./routes/Routepath";
import { StateProvider } from "./Library/Context";

function App() {
  return (
    <>
      <StateProvider>
        <Routepath />
      </StateProvider>
    </>
  );
}

export default App;
