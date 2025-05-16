import axios from "axios";
import type { SearchType } from "../types";
import { z } from "zod";
// import { object, string, number, parse } from "valibot";
// import type { InferOutput } from "valibot";
import { useMemo, useState } from "react";

const searchSchema = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_min: z.number(),
        temp_max: z.number(),
    })
})

export type weatherType = z.infer<typeof searchSchema>

const initialWeather = {
    name: '',
    main: {
        temp: 0,
        temp_min: 0,
        temp_max: 0,
    }
}

export default function useWeather() {


    const [weather, setWeather] = useState<weatherType>(initialWeather)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fecthWeather = async (search: SearchType) => {

        const appId = import.meta.env.VITE_API_KEY
        setLoading(true)
        setWeather(initialWeather)
        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            const {data} = await axios.get(geoUrl)

            if(!data[0]){
                setNotFound(true)
                setWeather(initialWeather)
                return
            }

            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            const {data: weatherData} = await axios.get(weatherUrl)

            // ZOD

            const result = searchSchema.safeParse(weatherData)

            if(result.success) {
                setWeather(result.data)
                setNotFound(false)
            }
            // Valibot
            // const result = parse(searchSchema, weatherData)

            
        } catch (error) {
            console.error('Error fetching weather data:', error);
        } finally {
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])

    return {
        weather,
        loading,
        notFound,
        fecthWeather,
        hasWeatherData
    }
}