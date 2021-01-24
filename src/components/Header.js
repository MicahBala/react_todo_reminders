import Button from "./Button";

const Header = ({ title, onAdd }) => {
  // const handleClick = () => {
  //   console.log("Clicked!");
  // };

  return (
    <header className="header">
      <h1>{title}</h1>
      <Button onClick={onAdd} color="green" text="Add" />
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

export default Header;
