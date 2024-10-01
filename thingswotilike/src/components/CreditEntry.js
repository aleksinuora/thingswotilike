const CreditEntry = ({ person }) => {
  const sortedCredits = person.credit_details.sort((a, b) => {
    return new Date(b.work.premiered) - new Date(a.work.premiered);
  });

  return (
    <tr>
      <th>{person.person_name}</th>
      as <th>{sortedCredits[0].role_type}</th>
      in{' '}
      <th>
        <a href={`https://imdb.com/title/${sortedCredits[0].work.imdb}`}>
          {sortedCredits[0].work.title}
        </a>
      </th>
    </tr>
  );
};

export default CreditEntry;
