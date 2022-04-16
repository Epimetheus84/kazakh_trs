import {
  Navigate,
} from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

export default function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  return auth.isAuthenticated() ? children : <Navigate to="/login" />;
}
