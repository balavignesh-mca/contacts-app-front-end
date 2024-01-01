import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./components/auth/reigster";
import { Welcome } from "./components/welcome";
import { Login } from "./components/auth/login";
import { ErrorPage } from "./components/other/error404";
import { Profile } from "./components/profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="404" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
