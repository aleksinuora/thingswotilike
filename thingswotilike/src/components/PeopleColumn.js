import { deletePerson } from '../reducers/peopleReducer';
import { dropCredits } from '../reducers/creditsReducer';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useState } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';

const PeopleColumn = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const dispatch = useDispatch();
  const people = useSelector((state) => state.people);

  const handleClose = () => setSelectedPerson(null);
  const handleUnfollow = () => {
    dispatch(deletePerson(selectedPerson._id));
    dispatch(dropCredits(selectedPerson._id));
    setSelectedPerson(null);
  };

  const UnfollowDialog = () => {
    return (
      <Dialog onClose={handleClose} open={!!selectedPerson}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to unfollow {selectedPerson.name}?
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleUnfollow}>Aye</Button>
            <Button onClick={handleClose}>Naw</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div>
      <h3>Followed people</h3>
      {people ? (
        <ul>
          {people.map((person) => (
            <li key={person._id}>
              {person.name}
              <Button
                key={person._id}
                onClick={() => setSelectedPerson(person)}
              >
                X
              </Button>
            </li>
          ))}
          {}
        </ul>
      ) : (
        <>Loading</>
      )}
      {selectedPerson != null ? <UnfollowDialog /> : <></>}
    </div>
  );
};

export default PeopleColumn;
