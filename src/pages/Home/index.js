import Menu from "../../containers/Menu";
import ServiceCard from "../../components/ServiceCard";
import EventCard from "../../components/EventCard";
import PeopleCard from "../../components/PeopleCard";

import "./style.scss";
import EventList from "../../containers/Events";
import Slider from "../../containers/Slider";
import Logo from "../../components/Logo";
import Icon from "../../components/Icon";
import Form from "../../containers/Form";
import Modal from "../../containers/Modal";
import { useData } from "../../contexts/DataContext";

const Page = () => {
  const { last, loading } = useData();
  const renderLastEvent = () => {
    if (loading) {
      return <div>Chargement...</div>;
    }
    if (last) {
      return (
        <EventCard
          imageSrc={last.cover}
          title={last.title}
          date={new Date(last.date)}
          small
          label={last.type}
        />
      );
    }
    return <div>Aucune prestation disponible pour le moment.</div>;
  };

  return (
    <>
      <header>
        <Menu />
      </header>
      <main>
        <section className="SliderContainer">
          <Slider />
        </section>
        <section className="ServicesContainer" id="nos-services">
          <h2 className="Title">Nos services</h2>
          <p>Nous organisons des evenements sur mesure partout dans le monde.</p>
          <div className="ListContainer">
            <ServiceCard imageSrc="/images/priscilla-du-preez-Q7wGvnbuwj0-unsplash1.png">
              <h3>Soiree d&apos;entreprise</h3>
              Une soiree d&apos;entreprise permet de reunir vos equipes pour un moment convivial afin de valoriser votre societe en projetant une image dynamique. Nous organisons pour vous vos diners et soirees d&apos;entreprise.
            </ServiceCard>
            <ServiceCard imageSrc="/images/hall-expo.png">
              <h3>Conferences</h3>
              724 events organise votre evenement, quelle que soit sa taille, en s&apos;adaptant a vos demandes. En tant que specialistes de l&apos;evenementiel, nous trouvons le lieu ideal et des solutions pour capter votre audience et garantir le succes de votre evenement.
            </ServiceCard>
            <ServiceCard imageSrc="/images/sophia-sideri-LFXMtUuAKK8-unsplash1.png">
              <h3>Experience digitale</h3>
              Notre agence experte en contenus immersifs conseille les entreprises sur l&apos;utilisation de la realite virtuelle, de la realite augmentee et de la realite mixte, de la veille technologique jusqu&apos;au developpement de modules de formation innovants.
            </ServiceCard>
          </div>
        </section>
        <section className="EventsContainer" id="nos-realisations">
          <h2 className="Title">Nos realisations</h2>
          <EventList />
        </section>
        <section className="PeoplesContainer" id="notre-equipe">
          <h2 className="Title">Notre equipe</h2>
          <p>Une equipe d&apos;experts dedies a l&apos;organisation de vos evenements.</p>
          <div className="ListContainer">
            <PeopleCard
              imageSrc="/images/stephanie-liverani-Zz5LQe-VSMY-unsplash.png"
              name="Samira"
              position="CEO"
            />
            <PeopleCard
              imageSrc="/images/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.png"
              name="Jean-baptiste"
              position="Directeur marketing"
            />
            <PeopleCard
              imageSrc="/images/christina-wocintechchat-com-SJvDxw0azqw-unsplash.png"
              name="Alice"
              position="CXO"
            />
            <PeopleCard
              imageSrc="/images/jonas-kakaroto-KIPqvvTOC1s-unsplash.png"
              name="Luis"
              position="Animateur"
            />
            <PeopleCard
              imageSrc="/images/amy-hirschi-b3AYk8HKCl0-unsplash1.png"
              name="Christine"
              position="VP animation"
            />
            <PeopleCard
              imageSrc="/images/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash.png"
              name="Isabelle"
              position="VP communication"
            />
          </div>
        </section>
        <div className="FormContainer" id="contact">
          <h2 className="Title">Contact</h2>
          <Modal
            Content={
              <div className="ModalMessage--success">
                <div>Message envoye !</div>
                <p>
                  Merci pour votre message, nous tacherons de vous repondre dans les plus brefs delais.
                </p>
              </div>
            }
          >
            {({ setIsOpened }) => (
              <Form
                onSuccess={() => setIsOpened(true)}
                onError={() => null}
              />
            )}
          </Modal>
        </div>
      </main>
      <footer className="row">
        <div className="col presta">
          <h3>Notre derniere prestation</h3>
          {renderLastEvent()}
        </div>
        <div className="col contact">
          <h3>Contactez-nous</h3>
          <address>45 avenue de la Republique, 75000 Paris</address>
          <div>01 23 45 67 89</div>
          <div>contact@724events.com</div>
          <div>
            <a href="#twitch">
              <Icon name="twitch" />
            </a>
            <a href="#facebook">
              <Icon name="facebook" />
            </a>
            <a href="#twitter">
              <Icon name="twitter" />
            </a>
            <a href="#youtube">
              <Icon name="youtube" />
            </a>
          </div>
        </div>
        <div className="col description">
          <Logo size="large" />
          <p>
            Une agence evenementielle propose des prestations de service specialisees dans la conception et l&apos;organisation de divers evenements tels que des evenements festifs, des manifestations sportives et culturelles, des evenements professionnels.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Page;





