// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Polls from './pages/Polls';
// import Home from './pages/Home';
// import Login from './pages/Login';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/home" element={<Home />} />
//         <Route path="/polls" element={<Polls />} />
//         <Route path="/" element={<Login/>} />
//       </Routes>
//     </BrowserRouter>
    
//   )
// }

// export default App; 

//comment everything out for testing rn

import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <DashboardPage user={user} onLogout={handleLogout} />
  );
}

export default App;