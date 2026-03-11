import styled from 'styled-components';
import { GlassContainer, GlassContent } from '../../styles/sharedStyles';

export const Container = GlassContainer;

export const Title = styled.h1`
  color: ${({ theme }) => theme.white};
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 8px;
  text-align: center;
  letter-spacing: -0.5px;
  font-family: ${({ theme }) => theme.fonts.poppins};
`;

export const SubTitle = styled.p`
  color: ${({ theme }) => theme.textGray};
  font-size: 14px;
  text-align: center;
  margin-bottom: 32px;
  font-weight: 400;
`;

export const Content = styled(GlassContent)`
  max-width: 550px;
  padding: 48px;

  .stripe-container {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  footer {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 24px;
    margin-top: 12px;

    .security-badges {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;

      .badge {
        display: flex;
        align-items: center;
        gap: 6px;
        color: ${({ theme }) => theme.textGray};
        font-size: 12px;
        font-weight: 500;
        opacity: 0.8;

        svg,
        i {
          font-size: 14px;
          color: ${({ theme }) => theme.success};
        }
      }
    }
  }

  .subtitle {
    color: ${({ theme }) => theme.textGray};
    font-size: 14px;
    text-align: center;
    margin-bottom: 32px;
    font-weight: 400;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.primary};
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    color: ${({ theme }) => theme.white};
    transform: translateX(-4px);
  }

  svg {
    font-size: 18px;
  }
`;
