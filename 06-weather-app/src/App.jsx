import { useState, useEffect } from "react";
import "./App.css";
import { Audio } from "react-loader-spinner";
import dayjs from "dayjs";

function App() {
  const [inpValue, setInpValue] = useState("");
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onLoadData = async () => {
    setIsLoading(true);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=karachi&appid=be85c510b192f3dceefa770a95a3557d`
    );
    const result = await response.json();
    setWeather(result);
    console.log(result);
    setIsLoading(false);
  };

  useEffect(() => {
    onLoadData();
  }, []);

  const handleKeyPress = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(inpValue);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inpValue}&appid=be85c510b192f3dceefa770a95a3557d`
    );
    const result = await response.json();
    setWeather(result);
    console.log(result);
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-50 h-screen">
      <main className="text-slate-600 w-4/5 m-auto">
        <h2 className="text-3xl text-center font-bold py-8">
          React Weather Application
        </h2>
        <div className="w-16 m-auto mb-10">
          <Audio
            height="50"
            width="50"
            color="#4fa94d"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={isLoading}
          />
        </div>
        <section>
          <div className="flex flex-col justify-center items-center">
            <form onSubmit={handleKeyPress} className="items-center">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  // id="search"
                  // onKeyUp={handleKeyPress}
                  onChange={(e) => setInpValue(e.target.value)}
                  value={inpValue}
                  className="block w-80 px-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter any city"
                  required
                />
              </div>
            </form>
          </div>

          {weather.name ? (
            <div className="flex mt-5 items-center justify-center">
              <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs">
                <div className="font-bold text-xl">
                  {weather.name} - {weather.sys.country}
                </div>
                <div className="text-sm text-gray-500">
                  {dayjs(weather.coord.dt).format("DD MMMM YYYY")}
                </div>
                <div className="mt-2 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                  <svg
                    className="w-32 h-32"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-row items-center justify-center mt-6">
                  <div className="font-medium text-6xl">
                    {Math.round(weather.main.temp)}°C
                  </div>
                  <div className="flex flex-col items-center ml-6">
                    <div className="font-semibold">
                      {weather.weather[0].main}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between mt-6">
                  <div className="flex flex-col items-center">
                    <div className="font-medium text-sm">Wind</div>
                    <div className="text-sm text-gray-500">
                      {weather.wind.speed.toFixed(2)} k/h
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="font-medium text-sm">Humidity</div>
                    <div className="text-sm text-gray-500">
                      {weather.main.humidity}%
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="font-medium text-sm">Visibility</div>
                    <div className="text-sm text-gray-500">10km</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h2 className="text-xl text-center font-semibold">
              Please enter a valid city
            </h2>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
