import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Home, Auth, Orders, Menu, DashBoard, Settings } from './pages';
import Header from "./components/shared/header";
import { useSelector } from 'react-redux';
import useLoadData from './hooks/useLoadData';
import FullScreenLoader from './components/shared/fullScreenLoader';

function Layout(){

  const location = useLocation();
  const { isLoading } = useLoadData();
  const hideHeaderRoutes = ['/auth']; // Add routes where you want to hide the header
  const { isAuth } = useSelector((state) => state.user);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header/>}
      <Routes>
        <Route path="/" element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          } />
        <Route path="/auth" element={ isAuth ? <Navigate to="/" replace /> : <Auth /> } />
        <Route path="/orders" element={
          <ProtectedRoutes>
            <Orders />
          </ProtectedRoutes>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoutes>
            <DashBoard />
          </ProtectedRoutes>
        } />
        <Route path="/menu" element={
          <ProtectedRoutes>
            <Menu />
          </ProtectedRoutes>
        } />
        <Route path="/settings" element={
          <ProtectedRoutes>
            <Settings />
          </ProtectedRoutes>
        } />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  )

}


function ProtectedRoutes( { children } ){
  const { isAuth } = useSelector((state) => state.user);
  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}


function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
