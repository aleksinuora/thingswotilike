import { useEffect, useState } from 'preact/hooks';
import ContentColumn from './components/ContentColumn';
import PeopleColumn from './components/PeopleColumn';
import PeopleSearch from './components/PeopleSearch';
import { getPeople } from './services/people';
import { getCredits } from './services/credits';
/*import { Router, LocationProvider, ErrorBoundary, Route } from 'preact-iso';*/

export function App() {
  const [tvShows, setTvShows] = useState(null);
  const [people, setPeople] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      const shows = await getCredits();
      const peopleTemp = await getPeople();
      setPeople(peopleTemp);
      setTvShows(shows);
    };
    fetchShows();
  }, []);

  return (
    <>
      <div class='row'>
        <div class='column'>
          {tvShows ? <ContentColumn content={tvShows} /> : <>Loading...</>}
        </div>
        <br />
        <div class='column'>
          {people ? (
            <PeopleColumn people={people} setPeople={setPeople} />
          ) : (
            <>Loading...</>
          )}
        </div>
        <div class='column'>
          <PeopleSearch people={people} setPeople={setPeople} />
        </div>
      </div>
    </>
  );
}
