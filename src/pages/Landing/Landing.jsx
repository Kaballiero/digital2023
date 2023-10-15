import { useNavigate } from 'react-router-dom';

import nmic from "./NMIC.svg";
import nprg from "./NPRF.svg";
import forest from "./forest.png";
import runner from "./runner.png";
import hackIcon from "./hackicon.svg";
import step1 from "./step1.png";
import step2 from "./step2.png";
import step3 from "./step3.png";
import step4 from "./step4.png";
import step5 from "./step5.png";
import styles from "./styles.module.scss";

const tutor = [
  {
    img: step1,
    text: (
      <h1 className={styles.step_text}>
        В нашем <b className={styles.green}>веб-приложении</b> вы можете
        выделить область для анализа на карте, расставив точки как вам угодно!
      </h1>
    ),
  },
  {
    img: step2,
    text: (
      <h1 className={styles.step_text}>
        Найдите <b className={styles.green}>свой город и район</b> с помощью{" "}
        <b className={styles.blue}>поиска</b>
      </h1>
    ),
  },
  {
    img: step3,
    text: (
      <h1 className={styles.step_text}>
        Нажатием по карте выделите <b className={styles.green}>часть местности</b> для{" "}
        <b className={styles.blue}>анализа</b>
      </h1>
    ),
  },
  {
    img: step4,
    text: (
      <h1 className={styles.step_text}>
        Получите оценку <b className={styles.green}>здоровой среды</b> выбранной{" "}
        <b className={styles.blue}>области</b>
      </h1>
    ),
  },
  {
    img: step5,
    text: (
      <h1 className={styles.step_text}>
        Хотите <b className={styles.green}>увеличить точность</b> обработки?
        Загрузите <b className={styles.blue}>свои данные</b> для улучшения
        сервиса!
      </h1>
    ),
  },
];

const Landing = () => {
  const scrollToInstructions = () => {
    const instructionsElement = document.getElementById("tutor");
    if (instructionsElement) {
      instructionsElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Перенаправить на маршрут /main
    navigate('/main');
  };
  return (
    <div className={styles.landing}>
      <div className={styles.header}>
        {" "}
        <div className={styles.header_container}>
          {" "}
          <div className={styles.icons}>
            <img src={nmic} alt="" className={styles.logo} />
            <img src={nprg} alt="" className={styles.logo} />
          </div>
          <h1 className={styles.title}>
            Анализируем
            <br />
            <b className={styles.title_green}> Здоровую </b>городскую среду
            <br />с помощью<b className={styles.title_blue}> AI</b>
          </h1>
          <button className={styles.btn_start} onClick={handleButtonClick}>Начать</button>
          <button className={styles.btn_tutor} onClick={scrollToInstructions}>
            Инструкция
          </button>
        </div>
        <img className={styles.img} src={forest} alt="" />
      </div>
      <div className={styles.about}>
        <div className={styles.title}> О нас</div>
        <div className={styles.about_container}>
          <h1 className={styles.text}>
            Формирование<b className={styles.text_green}> здоровой</b> среды –
            это самый эффективный способ увеличения продолжительности жизни.
            Однако формирование среды является сложным процессом, требующим
            широкого круга компетенций.
            <br />
            Эту потребность решает{" "}
            <b className={styles.text_blue}>искуственный интелект</b>,созданный
            нашей командой!
          </h1>
          <img src={runner} className={styles.img_big} alt="" />
        </div>
      </div>
      <div className={styles.tutor}>
        <div className={styles.title} id="tutor"> Инструкция</div>
        <div className={styles.tutor_container}>
          {tutor.map((step) => (
            <div className={styles.step}>
              {step.text}
              <img className={styles.step_img} src={step.img} />
            </div>
          ))}
        </div>
      </div>
      <button className={styles.btn_start} onClick={handleButtonClick}>Начать</button>
      <div className={styles.footer}>
        <div className={styles.footer_text}>
          <h1 className={styles.text_lable}>Наши партнеры: </h1>
          <h1 className={styles.text_info}>
            Отдел организационно-методического управленияи анализа качества
            медицинской помощи
          </h1>
          <h1 className={styles.text_info}>Национальный проект Демография</h1>
        </div>
        <img className={styles.hackIcon} src={hackIcon} />
      </div>
    </div>
  );
};

export default Landing;
