import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/Login";
import Signup from "./pages/Signup";



import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Matches from "./pages/Matches";
import Landing from "./pages/Landing";
import MainLayout from "./layouts/MainLayouts";
import CompleteProfile from "./pages/CompleteProfile";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />

        {/* App Layout */}
        <Route path="/app" element={<MainLayout />}>

          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="matches" element={<Matches />} />

        </Route>

      </Routes>

    </BrowserRouter>

  );

}

export default App;