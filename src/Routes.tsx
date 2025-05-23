import { createBrowserRouter, Navigate } from 'react-router';

import NewsPage from './pages/news';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/news" replace /> },
  { path: '/news', Component: NewsPage },
]);

export default router;
