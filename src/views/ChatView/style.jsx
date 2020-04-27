import styled from 'styled-components';
import colors from 'tokens/colors.mjs';
import fontSize from 'tokens/fontSizes.mjs';
import spacing from 'tokens/spacing.mjs';

export const StyledChatview = styled.div`
  .heigth-countainer {
    height: 70vh;
    .to-this-user {
      border-bottom: 2px ${colors.red} solid;
      .avatar {
        max-width: 34px;
        max-height: 34px;
      }
    }

    .chattcountainer {
      .timeposted {
        font-size: ${fontSize.microcopy};
        margin: ${spacing.tiny};
      }

      .chattbox {
        max-width: 70vw;
        background: ${colors.gray5};
        border-radius: 10px;
        padding: ${spacing.tiny};
        margin: ${spacing.tiny};
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

        .author {
          margin: 0.1rem 0;
          color: ${colors.red};
          font-size: ${fontSize.s};
        }

        .mess {
          margin: 0.3rem 0;
          font-size: ${fontSize.s};
        }
      }
    }
    .sendbox {
      position: fixed;
      bottom: 0;
      display: grid;
      grid-template-rows: 3fr 1fr;
    }
  }
`;