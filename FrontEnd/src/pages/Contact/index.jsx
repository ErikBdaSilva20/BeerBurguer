import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';

import {
  CardHeader,
  CardItem,
  CardList,
  ContactCard,
  Container,
  Content,
  InfoGrid,
  MapSection,
  TitleSection,
} from './styles';

export function Contact() {
  const contactInfo = {
    phones: [
      { label: 'Suporte Geral', value: '+55 (11) 99999-9999' },
      { label: 'Central de Entregas', value: '+55 (11) 88888-8888' },
    ],
    emails: [
      { label: 'Atendimento ao Cliente', value: 'contato@devburguer.com' },
      { label: 'Parcerias & Eventos', value: 'comercial@devburguer.com' },
    ],
    hours: [
      { label: 'Segunda a Quinta', value: '18:00 - 23:30' },
      { label: 'Sexta a Domingo', value: '18:00 - 01:00' },
    ],
    address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100',
  };

  return (
    <Container>
      <Content>
        <TitleSection>
          <h1>
            Fale com a <span>Gente</span>
          </h1>
          <p>
            Dúvidas, sugestões ou apenas quer falar sobre o melhor hambúrguer da cidade? Estamos
            prontos para te ouvir.
          </p>
        </TitleSection>

        <InfoGrid>
          <ContactCard>
            <CardHeader>
              <div className="icon-box">
                <PhoneEnabledIcon />
              </div>
              <h2>Telefones</h2>
            </CardHeader>
            <CardList>
              {contactInfo.phones.map((phone, index) => (
                <CardItem key={index}>
                  <span>{phone.label}</span>
                  <a href={`tel:${phone.value.replace(/\D/g, '')}`}>{phone.value}</a>
                </CardItem>
              ))}
            </CardList>
          </ContactCard>

          <ContactCard>
            <CardHeader>
              <div className="icon-box">
                <EmailIcon />
              </div>
              <h2>E-mails</h2>
            </CardHeader>
            <CardList>
              {contactInfo.emails.map((email, index) => (
                <CardItem key={index}>
                  <span>{email.label}</span>
                  <a href={`mailto:${email.value}`}>{email.value}</a>
                </CardItem>
              ))}
            </CardList>
          </ContactCard>

          <ContactCard>
            <CardHeader>
              <div className="icon-box">
                <AccessTimeIcon />
              </div>
              <h2>Horários</h2>
            </CardHeader>
            <CardList>
              {contactInfo.hours.map((hour, index) => (
                <CardItem key={index}>
                  <span>{hour.label}</span>
                  <p>{hour.value}</p>
                </CardItem>
              ))}
            </CardList>
          </ContactCard>

          <ContactCard>
            <CardHeader>
              <div className="icon-box">
                <LocationOnIcon />
              </div>
              <h2>Nossa Unidade</h2>
            </CardHeader>
            <CardList>
              <CardItem>
                <span>Sede Principal</span>
                <p>{contactInfo.address}</p>
              </CardItem>
            </CardList>
          </ContactCard>
        </InfoGrid>

        <MapSection>
          <iframe
            title="Google Maps Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3657.0658305016595!2d-46.653154823758245!3d-23.564299961266396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da1737f3%3A0x46422204555845!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-100!5e0!3m2!1spt-BR!2sbr!4v1710100000000!5m2!1spt-BR!2sbr"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          <div className="map-overlay">
            <em>Localização Premium</em>
            <address>{contactInfo.address}</address>
          </div>
        </MapSection>
      </Content>
    </Container>
  );
}
