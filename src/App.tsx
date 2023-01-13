import { HashRouter, Route, Routes } from 'react-router-dom';
import CardsPage from './pages/CardsPage';
import DetailsPage from './pages/DetailsPage';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/details" element={<DetailsPage />} /> */}
      <Route path="/cards" element={<CardsPage />} />
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
