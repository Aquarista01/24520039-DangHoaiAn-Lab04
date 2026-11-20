import { lazy, Suspense } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useParams,
} from 'react-router';
import Layout from './components/Layout.jsx';
import PeopleLayout from './components/PeopleLayout.jsx';
import PersonDetailSkeleton from './components/PersonDetailSkeleton.jsx';
import SimpleForm from './components/form/SimpleForm.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import { featuredPersonId, people } from './data/people.js';

const LazyPersonDetail = lazy(
  () => import('./pages/PersonDetail.jsx'),
);

function PeopleIndex() {
  return (
    <section
      className="home-panel"
      aria-label="People selection"
    >
      <h1>Select a person to view their details</h1>
      <p>Choose a profile from the People navigation.</p>
    </section>
  );
}

function PersonRoute({ Detail, people }) {
  const { id } = useParams();

  const person = people.find(
    (person) => person.id === id,
  );

  return (
    <Suspense
      key={id}
      fallback={<PersonDetailSkeleton person={person} />}
    >
      <Detail people={people} />
    </Suspense>
  );
}

export default function App({
  Detail = LazyPersonDetail,
}) {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="form" element={<SimpleForm />} />

        <Route
          path="people"
          element={<PeopleLayout people={people} />}
        >
          <Route index element={<PeopleIndex />} />
          <Route
            path=":id"
            element={
              <PersonRoute Detail={Detail} people={people} />
            }
          />
        </Route>

        <Route
          path="person"
          element={
            <Navigate
              to={`/people/${encodeURIComponent(featuredPersonId)}`}
              replace
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
