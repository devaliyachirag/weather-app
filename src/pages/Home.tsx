import { useEffect, useState } from "react";
import Header from "../components/Header/Index";
import Input from "../components/Input/Index";
import axios from "axios";
import dayjs from "dayjs";
const Home = () => {
  const [city, setCity] = useState<string>("");
  const [data, setData] = useState<any>("");
  const [date, setDate] = useState<string>(
    dayjs(new Date()).format("dddd Dd-MMMM ")
  );
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
  const handleInput = async (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setCity("");
      setWeather({ ...weather, loading: true });
      const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=8b8b4b8df19a2f341a97f6ab5799a54c";

      await axios
        .get(url)
        .then((res) => {
          console.log("res", res.data);
          setData(res.data);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setCity("");
          console.log("error", error);
        });
    }
  };
  return (
    <>
      <div
        className="text-center"
        style={{
          height: "100vh",
          width: "100%",
          backgroundColor: "#92dbd5",
          padding: "128PX",
        }}
      >
        <div
          className="card"
          style={{
            minHeight: "500px",
            width: "500px",
            margin: "auto",
            padding: "25px",
            borderRadius: "25px",
            boxShadow:
              "0 4px 8px 0 rgba(0,0,0,.2), 0 6px 20px 0 rgba(0,0,0,.5)",
            alignContent: "space-between",
            backgroundColor: "#fff",
          }}
        >
          <Header value="Weather App" />
          <Input
            onKeyDown={(e) => handleInput(e)}
            value={city}
            onChange={(value) => setCity(value)}
          />
          {weather.loading && (
            <>
              <h4>
                <i>Loading...</i>
              </h4>
            </>
          )}
          {data && !weather.error ? (
            <div className="p-4">
              <h2>
                {data.name}, <span>{data.sys.country}</span>
              </h2>
              <h3>{data.weather.id}</h3>
              <div className="date">{date}</div>
              <div className="icon-temp h1">
                <img
                  className=""
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt={data.weather[0].description}
                />
                {Math.round(data.main.temp)}
                <sup>&deg;C</sup>
              </div>
              <div className="des-wind">
                <p>{data.weather[0].description.toUpperCase()}</p>
                <p>Wind Speed: {data.wind.speed}m/s</p>
              </div>
            </div>
          ) : (
            <h2 className="text-muted h1">no data</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
