import { useNavigate } from "react-router-dom";
import { useFakeAuth } from "../Contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthentificated } = useFakeAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthentificated) navigate("/");
    },
    [isAuthentificated, navigate]
  );
  return isAuthentificated ? children : null;
}

export default ProtectedRoute;
