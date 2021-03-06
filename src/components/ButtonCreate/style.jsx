import styled from 'styled-components';

import fontSizes from 'tokens/fontSizes.mjs';
import spacing from 'tokens/spacing.mjs';
import colors from 'tokens/colors.mjs';

export const StyledButtonCreate = styled.button`
  width: 48px;
  height: 48px;
  padding: ${spacing.tiny};
  background: ${colors.red};
  border-radius: 999rem;
  font-size: ${fontSizes.m};
  font-family: 'Londrina Solid', cursive;
  text-align: 'center';
  text-decoration: none;
  cursor: pointer;
  transition: 0.1s;
  border: none;
  position: fixed;
  bottom: 12vh;
  right: 3vw;
  align-self: flex-end;

  .plus {
    padding: 0.5rem;
  }
`;
