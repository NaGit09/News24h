
export interface WeatherData {
    current: {
        temp: number;
        status: string;
        description: string;
        humidity: number;
        windSpeed: number;
        uvIndex: number; // Open-Meteo free API doesn't always have UV in the basic set without extra params, I'll check or mock/omit
        isDay: boolean;
        weatherCode: number;
    };
    hourly: {
        time: string;
        temp: number;
        status: string; // mapped code
        weatherCode: number;
    }[];
    weekly: {
        day: string;
        tempHigh: number;
        tempLow: number;
        status: string; // mapped code
        weatherCode: number;
    }[];
}

const WMO_CODES: Record<number, { label: string; icon: string }> = {
    0: { label: "Trời quang", icon: "sun" },
    1: { label: "Chủ yếu là nắng", icon: "sun" },
    2: { label: "Có mây", icon: "cloud" },
    3: { label: "Nhiều mây", icon: "cloud" },
    45: { label: "Sương mù", icon: "cloud-fog" },
    48: { label: "Sương mù rime", icon: "cloud-fog" },
    51: { label: "Mưa phùn nhẹ", icon: "cloud-drizzle" },
    53: { label: "Mưa phùn vừa", icon: "cloud-drizzle" },
    55: { label: "Mưa phùn dày", icon: "cloud-drizzle" },
    61: { label: "Mưa nhỏ", icon: "cloud-rain" },
    63: { label: "Mưa vừa", icon: "cloud-rain" },
    65: { label: "Mưa to", icon: "cloud-rain" },
    71: { label: "Tuyết rơi nhẹ", icon: "snowflake" },
    73: { label: "Tuyết rơi vừa", icon: "snowflake" },
    75: { label: "Tuyết rơi dày", icon: "snowflake" },
    80: { label: "Mưa rào nhẹ", icon: "cloud-rain" },
    81: { label: "Mưa rào vừa", icon: "cloud-rain" },
    82: { label: "Mưa rào to", icon: "cloud-rain" },
    95: { label: "Dông", icon: "cloud-lightning" },
    96: { label: "Dông kèm mưa đá nhẹ", icon: "cloud-lightning" },
    99: { label: "Dông kèm mưa đá to", icon: "cloud-lightning" },
};

export const getWeatherCodeInfo = (code: number) => {
    return WMO_CODES[code] || { label: "Không xác định", icon: "sun" };
};

export const fetchWeatherData = async (lat = 21.0285, lon = 105.8542): Promise<WeatherData> => {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
        );
        const data = await response.json();

        const currentInfo = getWeatherCodeInfo(data.current.weather_code);

        // Process Hourly (next 24h, take every 3 hours or just next 5 hours)
        const hourlyData = data.hourly.time
            .slice(0, 24)
            .map((time: string, index: number) => {
                const date = new Date(time);
                // Only take current and future hours, assume API returns logic sorted
                // Actually open-meteo returns full history for the day too sometimes or starts from 00:00
                // We'll just map roughly.
                return {
                    time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                    temp: Math.round(data.hourly.temperature_2m[index]),
                    weatherCode: data.hourly.weather_code[index],
                    status: getWeatherCodeInfo(data.hourly.weather_code[index]).icon
                }
            })
            .filter((_: any, idx: number) => {
                // Simple filter to get current hour onwards roughly? 
                // For now let's just take the next 5 hours from the current time index if possible 
                // Or simpler: just take the next 5 entries assuming fetch is relative to now? 
                // Open Meteo API 'hourly' usually starts from 00:00 of the day.
                // Let's find index of current hour
                const nowHour = new Date().getHours();
                const itemHour = new Date(data.hourly.time[idx]).getHours();
                return itemHour >= nowHour;
            })
            .slice(0, 6); // Take next 6 hours

        // Process Daily
        const dailyData = data.daily.time.map((time: string, index: number) => {
            const date = new Date(time);
            const dayName = index === 0 ? "Hôm nay" : date.toLocaleDateString('vi-VN', { weekday: 'long' });
            return {
                day: dayName,
                tempHigh: Math.round(data.daily.temperature_2m_max[index]),
                tempLow: Math.round(data.daily.temperature_2m_min[index]),
                weatherCode: data.daily.weather_code[index],
                status: getWeatherCodeInfo(data.daily.weather_code[index]).icon
            }
        });

        return {
            current: {
                temp: Math.round(data.current.temperature_2m),
                status: currentInfo.label,
                description: `Dự báo: ${currentInfo.label}`,
                humidity: data.current.relative_humidity_2m,
                windSpeed: data.current.wind_speed_10m,
                uvIndex: 0, // Not available in free fetching basic
                isDay: !!data.current.is_day,
                weatherCode: data.current.weather_code,
            },
            hourly: hourlyData,
            weekly: dailyData,
        };
    } catch (error) {
        console.error("Failed to fetch weather data", error);
        throw error;
    }
};
