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
      { label: 'Me contrate', value: '+55 (54) 99956-6625' },
      { label: 'Gostaria de conversar sobre essa página?', value: '+55 (54) 99956-6625' },
    ],
    emails: [
      { label: 'Gostaria de um currículo?', value: 'erik.erik.silvadesenvolvedor@gmail.com' },
      { label: 'Estou disponivel para trabalhos', value: 'erik.silvadesenvolvedor@gmail.com' },
    ],
    hours: [
      { label: 'Segunda a Quinta', value: '18:00 - 23:30' },
      { label: 'Sexta a Domingo', value: '18:00 - 01:00' },
    ],
    address: 'Rua dos Bobos, 1000 - Holvania, Sistema de origem - Rs, 4002-8922',
  };

  return (
    <Container>
      <Content>
        <TitleSection>
          <h1>
            Fale com o <span>Desenvolvedor</span>
          </h1>
          <p>
            Dúvidas, sugestões ou apenas quer falar sobre o este e-commerce? Entre em contato, estou
            pronto para discutir com você sobre qualquer tema!
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
            src="https://maps.google.com/maps?width=600&height=400&hl=en&q=Vancouver&t=h&z=14&ie=UTF8&iwloc=B&output=embed"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          <div className="map-overlay">
            <em>Nossa Localização </em>
            <address>{contactInfo.address}</address>
          </div>
        </MapSection>
      </Content>
    </Container>
  );
}
