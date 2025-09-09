import React from 'react';
import styles from './weather-card.module.css';

interface WeatherCardProps {
  city?: string;
  temperature?: string;
  condition?: string;
  wind?: string;
  humidity?: string;
  airQuality?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city = "??",
  temperature = "??",
  condition = "??",
  wind = "?? ?",
  humidity = "??",
  airQuality = "??",
}) => {
  return (
    <div className={`paper-card ${styles['weather-display']}`}>
      <div className={styles['weather-city']}>
        <span className="iconfont icon-location"></span>
        &ensp;{city}
      </div>
      <div className={styles['weather-data']}>
        {temperature}&ensp;{condition}
      </div>
      <div className={styles["weather-little-data"]}>
        <span className="iconfont icon-wind"></span>
        &ensp;{wind}
      </div>
      <div className={styles["weather-little-data"]}>
        <span className="iconfont icon-humidity"></span>
        &ensp;{humidity}
      </div>
      <div className={styles["weather-little-data"]}>
        <span className="iconfont icon-aqi"></span>
        &ensp;{airQuality}
      </div>
    </div>
  );
};

export default WeatherCard;
