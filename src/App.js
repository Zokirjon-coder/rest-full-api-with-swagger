import { useContext } from "react";
import Login from "./pages/login";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProviderAPI } from "./context/Auth";
import Dashboart from "./pages/dashboard";
import PageNotFound from "./pages/notFound";

function App() {
  const { auth } = useContext(AuthProviderAPI);
  if (!auth)
    return (
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
      </div>
    );
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Dashboart />} />
        <Route path="/" element={<Navigate to={"/dashboard"} />} />
        <Route path="/page-not-found" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to={"/page-not-found"} />} />
      </Routes>
    </div>
  );
}

export default App;
