export const formatTemerature = (temperature: number) : number => {
    const kelvin = 273.15
    return Math.round(temperature - kelvin)
}