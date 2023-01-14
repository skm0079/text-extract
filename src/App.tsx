import { HashRouter, Route, Routes } from 'react-router-dom';
import CardsPage from './pages/CardsPage';
import DetailsPage from './pages/DetailsPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/cards" element={<CardsPage />} />
      <Route path="/card-data" element={<DetailsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
