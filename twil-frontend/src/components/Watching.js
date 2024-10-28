import { useSelector } from 'react-redux';

const Watching = () => {
  const watchList = useSelector((state) => state.watchList);

  return (
    <div>
      {watchList.length !== 0 ? (
        <ul>
          {watchList.map((entry) => {
            return (
              <li key={entry._id}>
                <a
                  href={`https://imdb.com/title/${entry.credit_details.work.imdb}`}
                >
                  {entry.credit_details.work.title}
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <>Nothing here yet</>
      )}
    </div>
  );
};

export default Watching;
