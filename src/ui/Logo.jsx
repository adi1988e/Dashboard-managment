import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? "/logo_200x200 .png" : "/logo_200x200.png";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

export default Logo;
