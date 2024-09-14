import { useState } from 'react';
import './App.css';

function App() {
  let [city,setCity]=useState("");
  let [wDetails,setWDetails]=useState();
  let [isloading,setIsLoading] = useState(false);
  let getData=(event)=>{
    setIsLoading(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={}&units=metric`)
    .then((res)=>res.json())
    .then((finalres)=>{
      // console.log(finalres)
      if(finalres.cod=="404"){
        setWDetails(undefined)

      }else{
        setWDetails(finalres)
      }
      setIsLoading(false)
    })
    event.preventDefault();
    setCity('')
  }
  return (
    <>
     <div className='w-[100%] h-[100vh] bg-[#4aacb1] '>
      <div className="max-w-[1320px] mx-auto">
        <h1 className='text-[40px] font-bold py-[50px] text-white'>Simple WeatherApp</h1>
        
        <form onSubmit={getData}>
          <input type="text" value={city} on onChange={(e)=>setCity(e.target.value)}className='w-[300px] h-[40px] pl-3' id="" placeholder='City Name' />
          <button className='bg-[#202053] px-3 py-2 mx-2 text-white font-bold' >Submit</button>
        </form>

        <div className="w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative">

          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" width={100} className={`left-[38%] absolute ${isloading ?' ':'hidden'}`} alt="" />



          {wDetails!==undefined
          ?
          <>
          <h3 className='font-bold text-[30px]'>{wDetails.name}<span className='bg-[yellow]'>{wDetails.sys.country}</span></h3>
          <h2 className='font-bold text-[40px]'>
            {wDetails.main.temp}
            </h2>
          <img src={`https://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`} alt='img' />
          <p>{wDetails.weather[0].description}</p>
          </>
          :
          "No Data"
         }
        </div>

      </div>
     </div>
    </>
  );
}

export default App;
