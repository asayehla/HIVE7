import { createGlobalStyle } from 'styled-components';
import colors from 'tokens/colors.mjs';
import fontFamilies from 'tokens/fontFamilies.mjs';
import fontWeights from 'tokens/fontWeights.mjs';

export const StyledGlobalStyle = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css2?family=Londrina+Solid&display=swap');
 @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
 html {
    min-height: 100vh;
    width: 100vw;
    font-size: 16px;
  }

  @font-face {
    font-display: ${({ fontDisplay }) => fontDisplay};
    font-family: 'Inter', sans-serif;
    font-weight: ${fontWeights.fontRegular};
    src: url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
  }

  @font-face {
    font-display: ${({ fontDisplay }) => fontDisplay};
    font-family: 'Londrina Solid', cursive;
    font-weight: ${fontWeights.fontLight};
    src: url('https://fonts.googleapis.com/css2?family=Londrina+Solid&display=swap');
  }

  body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ${fontFamilies.fontRegular}, verdana;
    font-weight: ${fontWeights.fontLight};
  }

  #root {
    font-family: ${fontFamilies.fontRegular}, verdana;
  }

  img {
    max-width: 100%;
  }

  .no-js img.lazyload {
    display: none;
  }

  .map {
    position: relative;
    width: 100%;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

 a {
   text-decoration:none;
   color:${colors.black};
 }

  hr {
    border: 1.2px solid ${colors.gray4};
  }

  .red {
    color: ${colors.red};
  }

  .avatar {
    border-radius: 999rem;
    object-fit: cover;
  }

  /* input[type='radio'] {
      position: relative;
      height: 20px;
      width: 20px;
      border-radius: 999rem;
      outline: none !important;
      appearance: none;
      
      &::before {
        position: relative;
        display: block;
        content: '';
        background: white;
        border: ${colors.red} solid 1px;
        border-radius: 999rem;
        height: 20px;
        width: 20px;
        appearance: none;
      }
      &:checked::before {
        background: ${colors.red};
      }
      &:checked {
        appearance: none;

      }

    } */

    .reddott {
      width: 15px;
      height: 15px;
      border-radius: 999rem;
      border: 3px ${colors.red} solid;
      background-color: white; 
    }

    .donedott {
    width: 15px;
    height: 15px;
    border-radius: 999rem;
    border: 3px ${colors.red} solid;
    background-color: ${colors.red};
    }

  /* turn off ios auto zoom */
  input, select, textarea { 
    font-size: 16px !important;
   }

`;
