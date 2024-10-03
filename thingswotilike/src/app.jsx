import { useEffect, useState } from 'preact/hooks';
import { Router, LocationProvider, ErrorBoundary } from 'preact-iso';
import ContentColumn from './components/ContentColumn';
import PeopleColumn from './components/PeopleColumn';
import PeopleSearch from './components/PeopleSearch';
import NavBar from './components/NavBar';
import { getPeople } from './services/people';
import { getCredits } from './services/credits';

export function App() {
  const [tvShows, setTvShows] = useState(null);
  const [people, setPeople] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      const shows = await getCredits();
      setTvShows(shows);
    };
    const fetchPeople = async () => {
      const peopleTemp = await getPeople();
      setPeople(peopleTemp);
    };
    fetchShows();
    fetchPeople();
  }, []);

  return (
    <LocationProvider>
      <ErrorBoundary>
        <div class='row'>
          <NavBar />
        </div>

        <br />
        <PeopleSearch
          people={people}
          setPeople={setPeople}
          tvShows={tvShows}
          setTvShows={setTvShows}
        />

        <Router>
          <ContentColumn path='/' content={tvShows} />
        </Router>
      </ErrorBoundary>
      <Router>
        <PeopleColumn
          path={`/followed`}
          people={people}
          setPeople={setPeople}
        />
      </Router>
    </LocationProvider>
  );
}
