import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

import { preloadImage } from './lib/preloadImage';
import newsData from './pages/news/mocks/newsData.json';

const LazyNewsPage = lazy(() => import('./pages/news'));

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/news" replace /> },
  {
    path: '/news',
    Component: LazyNewsPage,
    loader: () => {
      preloadImage(newsData.headlineNews[0].thumbnail);
      preloadImage(newsData.commonNews[0].thumbnail);
    },
  },
]);

export default router;
