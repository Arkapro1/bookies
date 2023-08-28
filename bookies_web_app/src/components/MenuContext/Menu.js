import { MenuContextContainer } from "../styles/styles";
const Menu = ({ title, key }) => {
  return (
    <>
      <MenuContextContainer key={key}>{title}</MenuContextContainer>
    </>
  );
};
export default Menu;