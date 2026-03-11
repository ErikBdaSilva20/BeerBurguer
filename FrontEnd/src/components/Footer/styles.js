import styled from 'styled-components';

export const Container = styled.footer`
  width: 100%;
  padding: 20px 48px;
  background: rgba(0, 0, 0, 0.95);
  border-top: 1px solid rgba(255, 238, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 0.75rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.25);
    letter-spacing: 1px;
    text-align: center;

    span {
      color: rgba(255, 238, 0, 0.5);
      font-weight: 600;
    }
  }
`;
