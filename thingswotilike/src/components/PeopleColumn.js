import { unfollowPerson } from '../services/people';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useState } from 'preact/hooks';

const PeopleColumn = ({ people, setPeople }) => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleClose = () => setSelectedPerson(null);
  const handleUnfollow = () => {
    unfollowPerson(selectedPerson._id).then(() => {
      setPeople(people.filter((p) => p._id !== selectedPerson._id));
    });
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
