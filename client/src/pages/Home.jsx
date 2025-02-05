import Slider from "../components/Slider";
import "../styles/Home.css";
import {
  FaStethoscope,
  FaUserMd,
  FaHospital,
  FaHeartbeat,
} from "react-icons/fa";

function Home() {
  return (
    <div className="home">
      <Slider />

      <section className="features">
        <div className="feature">
          <FaStethoscope size={50} color="#295590" />
          <p>Vorsorgeuntersuchungen</p>
        </div>
        <div className="feature">
          <FaUserMd size={50} color="#295590" />
          <p>Hausärztliche Versorgung</p>
        </div>
        <div className="feature">
          <FaHospital size={50} color="#295590" />
          <p>Diagnostik</p>
        </div>
        <div className="feature">
          <FaHeartbeat size={50} color="#295590" />
          <p>Kardiologie</p>
        </div>
      </section>

      {/* Willkommen-Text-Bereich */}
      <section className="welcome-section">
        <h1>Facharzt für Gefäßchirurgie und Endovaskuläre Chirurgie</h1>
        <p>
          Herzlich willkommen in unserer Praxis für Gefäßchirurgie und
          endovaskuläre Chirurgie. Unser Team bietet Ihnen modernste
          medizinische Versorgung und individuelle Betreuung in allen Bereichen
          der Gefäßmedizin. Wir sind spezialisiert auf die Diagnose und
          Behandlung von Erkrankungen der Blutgefäße und Lymphgefäße.
        </p>
        <p>
          Zu unseren Leistungen gehören unter anderem die Behandlung von
          Krampfadern, Arterienerkrankungen, Aneurysmen sowie minimalinvasive
          endovaskuläre Eingriffe. Unser Ziel ist es, Ihnen eine erstklassige
          medizinische Versorgung und persönliche Betreuung auf höchstem Niveau
          zu bieten.
        </p>
        <p>
          Ihre Gesundheit und Ihr Wohlbefinden stehen bei uns an erster Stelle.
          Wir freuen uns darauf, Sie in unserer Praxis begrüßen zu dürfen!
        </p>
      </section>

      {/* Zitat-Bereich */}
      <section className="quote-section">
        <div className="quote-box">
          <p>
            „Es ist der größte Reichtum, gesund zu sein. In einem gesunden
            Körper wohnt ein glücklicher Geist.“
          </p>
          <span>– Deutsches Sprichwort</span>
        </div>
      </section>
    </div>
  );
}

export default Home;
