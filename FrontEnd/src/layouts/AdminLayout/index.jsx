import { Outlet } from 'react-router-dom';
import { Container, Main, Section } from './styles.js';
import { SideNavAdmin } from '../../components/SideNav';

export function AdminLayout() {
  return (
    <Container>
      <SideNavAdmin />
      <Main>
        <Section>
          <Outlet />
        </Section>
      </Main>
    </Container>
  );
}
