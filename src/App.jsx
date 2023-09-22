//Components
import Login from "./components/Login";
import { AlarmProvider } from "./contexts/AlarmContext";

function App() {
  return (
    <AlarmProvider>
      <Login />
    </AlarmProvider>
  );
}

export default App;
