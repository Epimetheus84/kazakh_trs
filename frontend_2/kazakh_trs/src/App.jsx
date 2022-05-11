import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  NotFoundPage,
  LoginPage,
  LoadDocuments,
  AdminUsersList,
  AdminUserCreate,
} from "./pages";
import "./styles/App.scss";
import { ProvideAuth } from "./hooks/use-auth.js";
import { PrivateRoute } from "./components";

const App = () => {
  return (
    <ProvideAuth className="App overflow-hidden">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/users-list"
            element={
              <PrivateRoute>
                <AdminUsersList />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-create"
            element={
              <PrivateRoute>
                <AdminUserCreate />
              </PrivateRoute>
            }
          />
          <Route
            path="/load-documents"
            element={
              <PrivateRoute>
                <LoadDocuments />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ProvideAuth>
  );
};

export default App;
