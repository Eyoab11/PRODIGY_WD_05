import weatherPhoto from '../assets/midnightinthevalley-mobile_png by Cagri Yurtbasi.jpg'
import React, { useRef, useState } from 'react'
import { FaHandHoldingWater, FaSearch, FaThermometerThreeQuarters, FaWater } from 'react-icons/fa';


const API_KEY = "5c86490ff1685b81ccc2dcc182a48a32";


const WeatherApp = () => {
    const inputRef = useRef(null)
    const [ apiData, setApiData ] = useState(null)
    const [ showWeather, setShowWeather ] = useState(null)
    const [ loading, setLoading ] = useState(false);



    const WeatherTypes = [
        {
          type: "Clear",
          img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
        },
        {
          type: "Rain",
          img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
        },
        {
          type: "Snow",
          img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
        },
        {
          type: "Clouds",
          img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
        },
        {
          type: "Haze",
          img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
        },
        {
          type: "Smoke",
          img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
        },
        {
          type: "Mist",
          img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
        },
        {
          type: "Drizzle",
          img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
        },
      ];

    const fetchWeather = async () => {
            const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${API_KEY}`;
            setLoading(true);
            fetch(URL)
            .then(res => res.json())
            .then(data =>{
                setApiData(null);

                if(data.cod == 404 || data.cod == 400) {
                    setShowWeather([{
                       type: 'Not Found',
                       img: "https://previews.123rf.com/images/vectorstockcompany/vectorstockcompany1809/vectorstockcompany180901621/109719685-of-404-error-page-or-file-not-found-icon-symbol-of-page-with-flag-404-on-laptop-display-concept.jpg"

                    }])
                }
                setShowWeather(
                    WeatherTypes.filter((weather) => weather.type === data.weather[0].main)
                );
                console.log(data);
                setApiData(data);
                setLoading(false);
            })
            .catch( err => {
                console.log(err)
                setLoading(false);
            }

            )
    }
  return (
    <div
      className="bg-gray-700 h-screen grid place-items-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${weatherPhoto})` }}
    >
            <h1 className='text-4xl text-white font-bold'>Weather Wizard</h1>
        <div className='bg-white w-96 p-4 rounded-lg -mt-60'>
            <div className='flex items-center justify-between'>
            <input
             type="text"
              placeholder='Enter the location ' 
              ref={inputRef}
              className='text-xl border-b p-1 border-gray-200 font-semibold uppercase text-black placeholder-black'/>
            <button onClick={fetchWeather}>
            <FaSearch className='w-14 text-2xl hover:text-orange-600' />
            </button>
            </div>
            <div className={`duration-300 delay-75 overflow-hidden ${showWeather ? 'h-[27rem]' : 'h-0'}`} >
               {
                loading ? (
                    <div className="grid place-items-center h-full">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
                      alt="..."
                      className="w-14 mx-auto mb-2 animate-spin"
                    />
                  </div>
                ):
                (
                showWeather && (
                 <div className='text-center flex flex-col gap-6 mt-10'>
                    {
                        apiData && 
                    
                <p className='text-xl font-semibold'> {
                    apiData?.name + ', ' + apiData?.sys?.country
                }</p>
                }

                <img src={showWeather[0]?.img} alt="..." className='w-52 mx-auto'/>
                <h3 className='text-4xl font-bold text-zinc-800'>
                    {showWeather[0]?.type}
                </h3>
                {
                    apiData && (
                        <>
                <div className='flex justify-around'>
                    <FaThermometerThreeQuarters className='h-9 mt-1 '/>
                    <h2 className='text-4xl font-extrabold mr-6'>
                    {apiData?.main?.temp}&#176;C
                    </h2>
                    
                    <FaWater className='h-9 mt-1 text-2xl'/>
                    <h2 className='text-4xl font-extrabold '>
                    {apiData?.main?.humidity}%
                    </h2>
                   
                </div>
                </>

                    )
                }
                
            </div>
              ) )}
            </div>
        </div>
    </div>
  );
}

export default WeatherApp;