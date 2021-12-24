export const createdDate = (registerDate: number | undefined) => {
    if (registerDate) {
        return new Date(registerDate).toLocaleDateString() + ' / ' + new Date(registerDate).toLocaleTimeString()
    } else return ''
}
export const msToTime = (duration: number) => {
    const dateNow = Date.now()
    let minutes: string | number = parseInt(String((duration / (1000 * 60)) % 60)),
        hours: string | number = parseInt(String((duration / (1000 * 60 * 60)) % 24));
    if(dateNow - duration > 86400){
        return new Date(duration).toLocaleDateString() + ' / ' + new Date(duration).toLocaleTimeString()
    }
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    return hours + ":" + minutes
}

export const getRandomCarsIot = () => {
    const engineHeating = Math.floor(Math.random() * (600 - 60)) + 60;
    const inflationOfTires = Math.floor(Math.random() * (120 - 40)) + 40;
    const tightnessOfBolts = Math.floor(Math.random() * (230 - 20)) + 20;
    const measurementDate = createdDate(Date.now())
    return {
        engineHeating,
        inflationOfTires,
        tightnessOfBolts,
        measurementDate
    }
}

export const getRandomStoragesIot = () => {
    const temperature = parseFloat((Math.floor(Math.random() * (35 - 15)) + 15).toString() + '.' + (Math.floor(Math.random() * 10)).toString())
    const humidity = Math.floor(Math.random() * (120 - 40)) + 40;
    const measurementDate = createdDate(Date.now())
    return {
        temperature,
        humidity,
        measurementDate
    }
}