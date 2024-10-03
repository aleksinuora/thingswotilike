import { useState } from 'preact/hooks';
import useDebounce from '../hooks/useDebounce';
import { findPerson, addPerson } from '../services/people';
import { getCreditsById } from '../services/credits';
import {
  Dialog,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

const PeopleSearch = ({ people, setPeople, tvShows, setTvShows }) => {
  const [searchWord, setSearchWord] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useDebounce(
    () => {
      const fetchSearchResults = async () => {
        findPerson(searchWord).then((response) => {
          setDebouncedSearch(response);
        });
      };
      if (searchWord != '') {
        fetchSearchResults();
      } else setDebouncedSearch(null);
    },
    [searchWord],
    700
  );

  const handleClose = () => setSelectedPerson(null);
  const handleFollow = (name, id) => {
    addPerson(name, id).then((person) => {
      setPeople([person, ...people]);
      getCreditsById(person._id).then((credits) => {
        setTvShows([credits, ...tvShows]);
      });
    });
    setSearchWord('');
    setSelectedPerson(null);
  };

  const handleSearch = (e) => setSearchWord(e.target.value);

  const FollowDialog = ({ name, id }) => {
    return (
      <Dialog onClose={handleClose} open={!!selectedPerson}>
        <DialogContent>
          <DialogContentText>Add {name} to followed people?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleFollow(name, id)}>Shure</Button>
          <Button onClick={() => handleClose()}>Nah</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const SearchResults = () => {
    return (
      <>
        {debouncedSearch.map((result) => {
          return (
            <div key={result.tvmaze_id}>
              <Button
                onClick={() => setSelectedPerson(result)}
                key={result.tvmaze_id}
              >
                {result.name}
              </Button>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div>
      Search for people to follow
      <br />
      <input
        type='search'
        placeholder='Search'
        value={searchWord}
        onInput={handleSearch}
        onChange={handleSearch}
      />
      {debouncedSearch ? <SearchResults /> : <></>}
      {selectedPerson !== null ? (
        <FollowDialog
          name={selectedPerson.name}
          id={selectedPerson.tvmaze_id}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default PeopleSearch;
