import { useState } from "react";
import cn from "classnames";
import Map from "../../components/map/Map.jsx";

import styles from "./styles.module.scss";
import { useEffect } from "react";

const MainPage = () => {
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [file, setFile] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const [res, setRes] = useState({});
  const [load, setLoad] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const openBtnHangler = () => {
    setShowResult(!showResult);
  };

  return (
    <div className={styles.mainPage}>
      <h1 className={styles.text}>
        Выбери район для <b className={styles.text_green}>аналитики</b>:
      </h1>
      <div className={styles.content}>
        <div
          className={cn(styles.content_map, {
            [styles.content_map_small]: showResult,
          })}
        >
          <Map
            setSearchParam={setSearchParam}
            setPolygonCoordinates={setPolygonCoordinates}
            polygonCoordinates={polygonCoordinates}
            zoom={13}
            center={{ lat: 51.5287718, lng: -0.2416804 }}
            setRes={setRes}
          />
        </div>
        <div className={styles.content_result}>
          <button
            onClick={openBtnHangler}
            className={styles.result_dropdown_btn}
          >
            <h1 className={styles.result_title}>результат</h1>
          </button>
          {res["recommendations"]!==undefined && (
            <div
              className={cn(styles.result_info, { [styles.hide]: !showResult })}
            >
              <h1 className={styles.info_title}>Оценка выделенного региона</h1>
              <div className={styles.info_general}>
                <h1 className={styles.general_title}>Общая статистика</h1>
                <div className={styles.general_content}>
                  <h1 className={styles.text_bold}>Общая информация:</h1>
                  <ul>
                    <li className={styles.text_info}>
                      Положительные объекты:{" "}
                      <b className={styles.text_info_pos}>
                        {res["positive objects"]}
                      </b>
                    </li>
                    <li className={styles.text_info}>
                      Отрицательные объекты:
                      <b className={styles.text_info_neg}>
                        {res["negative objects"]}
                      </b>
                    </li>
                  </ul>
                  <h1 className={styles.text_bold}>Анализ критериев:</h1>
                  <div className={styles.flex_row}>
                    <ul>
                      <li className={styles.text_info}>
                        Критерий 1:{" "}
                        <b
                          className={cn(styles.text_info_neg, {
                            [styles.text_info_pos]: res["criterion 1"] >= 0,
                          })}
                        >
                          {res["criterion 1"]}%
                        </b>
                      </li>
                      <li className={styles.text_info}>
                        Критерий 2:{" "}
                        <b
                          className={cn(styles.text_info_neg, {
                            [styles.text_info_pos]: res["criterion 2"] >= 0,
                          })}
                        >
                          {res["criterion 2"]}%
                        </b>
                      </li>
                    </ul>
                    <ul>
                      <li className={styles.text_info}>
                        Критерий 3:{" "}
                        <b
                          className={cn(styles.text_info_neg, {
                            [styles.text_info_pos]: res["criterion 3"] >= 0,
                          })}
                        >
                          {res["criterion 3"]}%
                        </b>
                      </li>
                      <li className={styles.text_info}>
                        Критерий 4:{" "}
                        <b
                          className={cn(styles.text_info_neg, {
                            [styles.text_info_pos]: res["criterion 4"] >= 0,
                          })}
                        >
                          {res["criterion 4"]}%
                        </b>
                        </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.info_analytics}>
                <h1 className={styles.analytics_title}>Результат Аналитики</h1>
                <div className={styles.analytics_content}>
                  <h1 className={styles.text_border}>
                    Общая оценка:{"  "}{" "}
                    <b className={styles.text_bold_blue}>
                      {res["overall assessment"]}%
                    </b>
                  </h1>

                  <h1 className={styles.text_bold}>
                    Рекомендации к застройке:
                  </h1>
                  <ul className={styles.list_row}>
                    {res["recommendations"]&&res["recommendations"].map((rec) => (
                      <li className={styles.text_info}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
