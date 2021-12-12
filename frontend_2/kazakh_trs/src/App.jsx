import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home, About, NotFoundPage, LoginPage } from "./pages";
import "./styles/App.scss";
import { ProvideAuth } from "./hooks/use-auth.js";
import { PrivateRoute } from "./components";

const App = () => {
  return (
    <ProvideAuth className="App overflow-hidden">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={(
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          )} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ProvideAuth>
  );
}

export default App;
