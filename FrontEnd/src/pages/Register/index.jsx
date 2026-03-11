import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BeerBurguerLogo from '../../assets/BeerBurguerLogo.png';
import abstractBackground from '../../assets/abstractBackground.jpg';
import formBackground from '../../assets/formBackground.jpg';
import { useUser } from '../../hooks/UserContext.jsx';
import api from '../../services/api.js';

import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase-config';

import {
  ButtonText,
  Container,
  Divider,
  DontHaveAccount,
  GoogleButton,
  LeftContainer,
  RightContainer,
  Title,
} from './styles.js';

export function Register() {
  const navigate = useNavigate();
  const { putUserData } = useUser();

  const handleRegisterWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const token = await user.getIdToken();
      const response = await api.post('/sessions', { token });

      const userData = response.data;

      putUserData(userData);
      toast.success('Conta criada com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Register Error:', error);
      toast.error('Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <Container>
      <LeftContainer $background={abstractBackground}>
        <img src={BeerBurguerLogo} alt="Beer Burguer" />
      </LeftContainer>

      <RightContainer $background={formBackground}>
        <Title>
          Crie sua <span>conta!</span>
        </Title>

        <ButtonText>
          <h1>
            Ficamos felizes em ter você aqui! <br />
            Entre com sua conta Google para começar.
          </h1>
        </ButtonText>

        <Divider style={{ marginBottom: '24px' }}>
          <span>cadastro rápido</span>
        </Divider>

        <GoogleButton type="button" onClick={handleRegisterWithGoogle}>
          Cadastrar com Google
        </GoogleButton>

        <DontHaveAccount style={{ marginTop: '20px' }}>
          Já possui conta?
          <button onClick={() => navigate('/login')}>Fazer login</button>
        </DontHaveAccount>
      </RightContainer>
    </Container>
  );
}
