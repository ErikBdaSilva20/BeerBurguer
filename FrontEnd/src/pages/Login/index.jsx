import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BeerBurguerLogo from '../../assets/BeerBurguerLogo.png';
import abstractBackground from '../../assets/abstractBackground.jpg';
import formBackground from '../../assets/formBackground.jpg';
import { useUser } from '../../hooks/UserContext.jsx';
import api from '../../services/api.js';

/**
 * Firebase imports
 */
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase-config';

import {
  Container,
  Divider,
  DontHaveAccount,
  GoogleButton,
  LeftContainer,
  RightContainer,
  Title,
} from './styles.js';

export function Login() {
  const navigate = useNavigate();
  const { putUserData } = useUser();

  const handleLoginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const token = await user.getIdToken();

      const response = await api.post('/sessions', { token });
      const userData = response.data;

      putUserData(userData);
      toast.success('Login realizado com sucesso!');

      if (userData.admin) {
        navigate('/admin/produtos');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login Error:', error);
      toast.error('Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <Container>
      <LeftContainer $background={abstractBackground}>
        <img src={BeerBurguerLogo} alt="Beer Burguer" />
      </LeftContainer>

      <RightContainer $background={formBackground}>
        <Title>
          Bem-vindo de <span>volta!</span>
        </Title>

        <Divider style={{ marginBottom: '28px' }}>
          <span>entre com sua conta</span>
        </Divider>

        <GoogleButton type="button" onClick={handleLoginWithGoogle}>
          Continuar com Google
        </GoogleButton>

        <DontHaveAccount style={{ marginTop: '20px' }}>
          Não possui conta?
          <button onClick={() => navigate('/cadastro')}>Criar conta grátis</button>
        </DontHaveAccount>
      </RightContainer>
    </Container>
  );
}
