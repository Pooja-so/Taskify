import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;

  h1 {
    color: ${(props) => props.theme.iconColor};
    font-size: 1.7rem;
    text-align: center;
    margin: 0.2rem;
  }

  .dashboard__header {
    padding: 1rem 1rem 0 1rem;
    height: 10%;
    display: flex;
    justify-content: space-between;
  }

  .dashboard__header div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .dashboard__workspace-container {
    position: relative;
    padding: 1rem;
    height: 90%;
    width: 100%;
    display: flex;
  }
  .blur-background {
    filter: blur(1px);
  }

  .dashboard__empty {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .dashboard__empty--img {
    width: 25rem;
    margin: 1rem;
  }
`;

export { StyledSection };
