export const sortDetails = (credit_details) => {
  const sortedDetails = [...credit_details].sort((a, b) => {
    return new Date(b.work.premiered) - new Date(a.work.premiered);
  });

  return sortedDetails;
};

export const sortByPremiere = (credits) => {
  const sortedDetails = credits.map((person) => ({
    ...person,
    credit_details: sortDetails(person.credit_details),
  }));

  return sortedDetails.sort((a, b) => {
    return (
      new Date(b.credit_details[0].work.premiered) -
      new Date(a.credit_details[0].work.premiered)
    );
  });
};
