import CreditEntry from './CreditEntry';
import { Fragment } from 'preact';

const ContentColumn = ({ content }) => {
  return (
    <div>
      <h2>Television</h2>
      {content ? (
        <table>
          <tbody>
            {content.map((person) => (
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
