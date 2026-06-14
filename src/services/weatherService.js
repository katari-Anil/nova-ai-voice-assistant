import { API_CONFIG } from '../config/apiConfig.js'

export async function getWeather(city = 'London') {
  const { key, endpoint } = API_CONFIG.openweather

  if (!key) {
    return {
      success: false,
      message: `I don't have a live connection to weather satellites right now, Commander — no API key is configured. Once VITE_OPENWEATHER_API_KEY is set, I can give you real-time weather for ${city}.`,
    }
  }

  try {
    const url = `${endpoint}?q=${encodeURIComponent(city)}&units=metric&appid=${key}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Weather service returned status ${response.status}`)
    }

    const data = await response.json()
    const description = data.weather?.[0]?.description || 'unknown conditions'
    const temp = Math.round(data.main?.temp ?? 0)
    const feelsLike = Math.round(data.main?.feels_like ?? 0)
    const humidity = data.main?.humidity ?? 0
    const cityName = data.name || city

    return {
      success: true,
      message: `Current conditions in ${cityName}: ${description}, ${temp}°C, feels like ${feelsLike}°C, humidity at ${humidity}%.`,
      data: { temp, feelsLike, humidity, description, city: cityName },
    }
  } catch (error) {
    return {
      success: false,
      message: `I encountered turbulence retrieving weather data for ${city}, Commander. ${error.message}`,
    }
  }
}
