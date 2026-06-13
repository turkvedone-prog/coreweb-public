import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BurcKaplamaHeader from './BurcKaplamaHeader.jsx';
import BurcKaplamaHome from './BurcKaplamaHome.jsx';
import BurcKaplamaFooter from './BurcKaplamaFooter.jsx';

function NotFound() {
  return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <h2>Sayfa Bulunamadı</h2>
      <a href="/" style={{ color: '#8B6914' }}>Ana Sayfaya Dön</a>
    </div>
  );
}

export default function App() {
  return (
    <div className="burckaplama-theme">
      <BrowserRouter>
        <BurcKaplamaHeader />
        <Routes>
          <Route path="/" element={<BurcKaplamaHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BurcKaplamaFooter />
      </BrowserRouter>
    </div>
  );
}
