import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './landingPage.module.css';

const LandingPage = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Activa la animación después de que el componente se monte
    setFadeIn(true);
  }, []);

  return (
    <div className={`${style.background} ${fadeIn ? style.fadeIn : ''}`}>
      <div className={style.elboton}>
        <h1 className={style.letrasc}>Countries: SoyHenry</h1>
        <Link to='/home' className={style.link}>
          <div>
            <button className={style.buttonEntrar}>
              <span className={style.start}>Entrar</span>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;

