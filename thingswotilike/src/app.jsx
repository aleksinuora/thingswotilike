import { useEffect } from 'preact/hooks';
import { Router, LocationProvider, ErrorBoundary } from 'preact-iso';
import ContentColumn from './components/ContentColumn';
import PeopleColumn from './components/PeopleColumn';
import PeopleSearch from './components/PeopleSearch';
import NavBar from './components/NavBar';
import Watching from './components/Watching';
import { useDispatch } from 'react-redux';
import { initializePeople } from './reducers/peopleReducer';
import { initializeCredits } from './reducers/creditsReducer';
import { initializeWatchList } from './reducers/watchListReducer';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCredits());
    dispatch(initializePeople());
    dispatch(initializeWatchList());
  }, [dispatch]);

  return (
    <LocationProvider>
      <ErrorBoundary>
        <div class='row'>
          <NavBar />
        </div>

        <br />
        <PeopleSearch />

        <Router>
          <ContentColumn path='/' />
        </Router>
        <Router>
          <PeopleColumn path={`/followed`} />
        </Router>
        <Router>
          <Watching path={'/watching'} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}
