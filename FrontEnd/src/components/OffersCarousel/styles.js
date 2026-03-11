import styled from 'styled-components';

export const Container = styled.div`
  padding: 40px 20px;
  overflow: hidden;
  margin-top: 40px;

  .react-multi-carousel-list {
    overflow: hidden;
  }

  .carousel-item {
    padding: 0 10px;
  }
`;

export const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 36px;
`;

export const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  text-align: center;
  color: ${({ theme }) => theme.white};
  font-family: ${({ theme }) => theme.fonts.roadRage};
  line-height: 1;

  span {
    color: ${({ theme }) => theme.primary};
  }
`;

export const TitleBadge = styled.span`
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  background: rgba(255, 238, 0, 0.08);
  border: 1px solid rgba(255, 238, 0, 0.18);
  padding: 4px 12px;
  border-radius: 100px;
`;
