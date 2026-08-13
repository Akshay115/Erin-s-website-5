import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EmberCursor, PaperCover, SmoothScroll } from './components/Chrome';
import 'lenis/dist/lenis.css';
import Home from './pages/Home';
import {
  About,
  Approach,
  Article,
  Contact,
  Detail,
  FAQ,
  FallRedirect,
  Goa,
  Journal,
  Legal,
  MoonPage,
  NotFound,
  Offerings,
  Retreats,
  Seasons,
  WorkRedirect,
} from './pages/Site';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <EmberCursor />
      <PaperCover />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/approach" element={<Approach />} />
        <Route path="/work" element={<WorkRedirect />} />
        <Route path="/offerings" element={<Offerings />} />
        <Route path="/offerings/:slug" element={<Detail />} />
        <Route path="/sacred-fall-reset" element={<FallRedirect />} />
        <Route path="/seasons" element={<Seasons />} />
        <Route path="/moon" element={<MoonPage />} />
        <Route path="/meditation-circle" element={<MoonPage />} />
        <Route path="/retreats" element={<Retreats />} />
        <Route path="/goa" element={<Goa />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<Article />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Legal />} />
        <Route path="/terms" element={<Legal terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
