import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Auth, Orders, Menu, DashBoard } from './pages';
import Header from "./components/shared/header";

function App() {

  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/auth" element={< Auth />} />
          <Route path="/orders" element={< Orders />} />
          <Route path="/dashboard" element={< DashBoard />} />
          <Route path="/menu" element={< Menu />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
