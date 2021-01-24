import Button from "./Button";

const Header = ({ title }) => {
  const handleClick = () => {
    console.log("Clicked!");
  };

  return (
    <header className="header">
      <h1>{title}</h1>
      <Button onClick={handleClick} color="green" text="Add" />
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

export default Header;
