import CreditEntry from './CreditEntry';
import { Fragment } from 'preact';
import { useSelector } from 'react-redux';

const ContentColumn = () => {
  const credits = useSelector((state) => state.credits);

  return (
    <div>
      <h2>Television</h2>
      {credits ? (
        <table>
          <tbody>
            {credits.map((person) => (
              <Fragment key={person._id}>
                {person.credit_details[0] ? (
                  <CreditEntry person={person} />
                ) : (
                  <></>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default ContentColumn;
