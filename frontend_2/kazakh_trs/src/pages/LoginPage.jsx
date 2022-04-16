import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../hooks/use-auth.js";

// login page with login form and register form
export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  // on submit
  const onSubmit = (state) => {
    console.log("onSubmit LOGIN PAGE [state]", state);
    setIsLoading(true);
    auth.signin(state).then(() => {
      console.log("success login");
      navigate("/");
    }).catch(() => {
      console.log("error login");
      setIsLoading(false);
    });
  };

  return (
    <LoginForm onSubmit={onSubmit} loading={isLoading} />
  );
}
