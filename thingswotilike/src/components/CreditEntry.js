import { Button } from '@mui/material';
import { addToWatchList } from '../reducers/watchListReducer';
import { useDispatch } from 'react-redux';

const CreditEntry = ({ person }) => {
  const dispatch = useDispatch();

  const handleWatch = (personName, creditDetails) => {
    dispatch(addToWatchList(personName, creditDetails));
  };

  return (
    <tr>
      <th>{person.person_name}</th>
      as <th>{person.credit_details[0].role_type}</th>
      in{' '}
      <th>
        <a
          href={`https://imdb.com/title/${person.credit_details[0].work.imdb}`}
        >
          {person.credit_details[0].work.title}
        </a>
      </th>
      <Button
        onClick={() =>
          handleWatch(person.person_name, person.credit_details[0])
        }
      >
        +
      </Button>
    </tr>
  );
};

export default CreditEntry;
