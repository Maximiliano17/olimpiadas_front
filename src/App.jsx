//Components
import Login from "./components/Login";
import { UserProvider } from "./contexts/userContext";

function App() {
  return (
    <UserProvider>
      <Login />
    </UserProvider>
  );
}

export default App;
