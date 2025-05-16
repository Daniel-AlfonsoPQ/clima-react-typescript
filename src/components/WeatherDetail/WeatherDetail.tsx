import type { weatherType } from '../../hooks/useWeather'
import { formatTemerature } from '../../utils'
import styles from './WeatherDetail.module.css'


type WeatherDetailProps = {
    weather: weatherType
}

export default function WeatherDetail({weather}: WeatherDetailProps) {
  return (
    <div className={styles.container}>
        <h2>Clima de: {weather.name}</h2>
        <p className={styles.current}>{formatTemerature(weather.main.temp)}&deg;C</p>
        <div className={styles.temperatures}>
            <p>Min: <span>{formatTemerature(weather.main.temp_min)}&deg;C</span></p>
            <p>Min: <span>{formatTemerature(weather.main.temp_max)}&deg;C</span></p>
        </div>
    </div>
  )
}
