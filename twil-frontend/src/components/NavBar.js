const NavBar = () => {
  return (
    <>
      <a href={`/`}> Home </a>|<a href={`/followed`}> Followed creators </a>|
      <a href='/watching'> Watch list </a>
    </>
  );
};

export default NavBar;
