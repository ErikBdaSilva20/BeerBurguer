import styled from 'styled-components';

export const Wrrapper = styled.div`
  .dpm-link {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);

    p {
      color: ${({ theme }) => theme.textGray};
      font-size: 13px;
      text-align: center;
      line-height: 1.6;

      a {
        color: ${({ theme }) => theme.primary};
        font-weight: 600;
        text-decoration: none;
        transition: all 0.2s;

        &:hover {
          color: ${({ theme }) => theme.white};
          text-decoration: underline;
        }
      }
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const SubmitButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: #000;
  border: none;
  border-radius: 12px;
  padding: 18px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(255, 238, 0, 0.2);
  margin-top: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover:not(:disabled) {
    background: #fff;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 238, 0, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    background: #1e1e1e;
    color: #444;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.danger};
  font-size: 14px;
  margin-top: -12px;
  text-align: center;
  font-weight: 500;
  background: rgba(255, 50, 5, 0.1);
  padding: 10px;
  border-radius: 8px;
`;
