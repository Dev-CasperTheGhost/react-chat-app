import Chat from "./Components/Chat";
import Index from "./Components/Index";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Index} />
      <Route path="/chat" exact component={Chat} />
    </Router>
  );
}

export default App;
