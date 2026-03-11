import { useNavigate } from 'react-router-dom';
import { Container, Content } from './styles';

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Container>
      <Content>
        <h1>
          <span>404</span> Página não encontrada{' '}
        </h1>
        <button onClick={() => navigate('/')}>Voltar a home</button>
      </Content>
    </Container>
  );
}
