import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Layout from './components/Layout.jsx';
import PersonDetailSkeleton from './components/PersonDetailSkeleton.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import { featuredPerson } from './data/featuredPerson.js';

const LazyPersonDetail = lazy(
  () => import('./pages/PersonDetail.jsx'),
);

export default function App({
  Detail = LazyPersonDetail,
}) {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          index
          element={<Home />}
        />

        <Route
          path="about"
          element={<About />}
        />

        <Route
          path="person"
          element={
            <Suspense
              fallback={
                <PersonDetailSkeleton
                  person={featuredPerson}
                />
              }
            >
              <Detail person={featuredPerson} />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
}
