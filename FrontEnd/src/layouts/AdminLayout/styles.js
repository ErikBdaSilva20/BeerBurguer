import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.mainBlack};

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background:
    radial-gradient(circle at 80% 20%, rgba(255, 238, 0, 0.025) 0%, transparent 50%),
    ${({ theme }) => theme.secondBlack};
`;

export const Section = styled.section`
  margin: 0 auto;
  padding: 40px 32px;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 900px) {
    padding: 24px 16px;
  }
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.danger};
  font-size: 0.8rem;
  margin-top: 4px;
  font-weight: 500;
`;
