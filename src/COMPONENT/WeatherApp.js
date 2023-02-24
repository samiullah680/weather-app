import React, { useEffect, useState } from 'react'
import '../CSS/WeatherApp.css'

const WeatherApp = () => {

   const [detail,setDetail] = useState('');
   const [datas,setDatas] = useState([])
   const [theme,setTheme] = useState('');
   const [styles,setStyles] = useState('');

   useEffect(()=>{

    const Location = async ()=>{
        const response = await fetch("https://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=auto:ip"
         ,
         {
          headers:{
           authorization:'token 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',
         
          } 
         })

         const data = await response.json();

          setDetail(data.location.name)
     

       
    }
    Location();

   },[])

    

    useEffect(()=>{
     const weather_details = async ()=>{
   
         const response = await fetch("https://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=$location="+detail
         ,
         {
          headers:{
           authorization:'token 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',
         
          } 
         })
         const data = await response.json();
      
            
        let name =  data.location.name;
        let time =  data.location.localtime;
        let temp_f =  data.current.temp_f;
        let temp_c = data.current.temp_c;
        let status =  data.current.condition.text;
        let icon = data.current.condition.icon;

        let style = data.current.condition.text;
 
         setStyles(style);



        let obj = {'Name':name,'Time':time,"Tempf":temp_f,"Tempc":temp_c,"Status":status,"Icon":icon};

        setDatas([obj]);

      
       
   
        }
   
        weather_details();

       
   
     },[detail])

     useEffect(()=>{


        if(styles.toLowerCase().includes('sunny') ){
            setTheme('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvWiz4BcRqaQ1J0s481hLhL-jbm0XdJIyt-owiCw28RMgAfAy12RfitwDvKjn2Tf3OK_0&usqp=CAU')
           
        }
        else if( styles.toLowerCase().includes('rain') ){
              setTheme('https://cdn.pixabay.com/photo/2016/11/29/05/29/buildings-1867550_960_720.jpg')
      
        }
        else if(styles.toLowerCase().includes('cloud')){
            setTheme('https://image.shutterstock.com/image-photo/blue-sky-clouds-background-ethereal-260nw-1701073582.jpg')
          
        }
        else if(styles.toLowerCase().includes('moderate') ){
            setTheme('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTFKMyKLQIvTeRBTjYGuHuQwTw5SWIJbJnYA&usqp=CAU')
          
        }
        else if(styles.toLowerCase().includes('mist')){
            setTheme('https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWlzdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60')
        
        }
        else if(styles.toLowerCase().includes('patchy')){
            setTheme('https://c4.wallpaperflare.com/wallpaper/626/350/495/rain-drops-splashes-heavy-rain-wallpaper-preview.jpg')
      
        }

        else{
           
            setTheme('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7o2-_7o-tBVIjPI7Dt34ynodIz0J4Gzux46TLu4GzqVWgoOESKa6gtKP91Sy78xxZUKQ&usqp=CAU')
           
           
        }


     },[styles])


    
     const Properties = (event)=>{
         if(event.key === 'Enter'){

            let val = document.getElementById('inp').value;
       
           setDetail(val); 

         }
     }


  return (
    <>
    

      <div className='container' style={{backgroundImage:`url(${theme})`}}>


        <div className='inputbox'>
            <h1 id='logo'>WEATHER APP</h1>
            <input id='inp' placeholder='Search the name of city,with state'  onKeyPress={Properties}/>
        
            

        </div>


        {
        datas.map((val)=>{
            
            
            return(
                <>

                <div className='disp'>
                    <h1 id='today'>TODAY</h1>
                    <h1 id='name'>{val.Name}</h1>
                    <h1 id='time'>{val.Time}</h1>

                    <h1 id='temp'>{val.Tempf} <sup>o</sup>F || {val.Tempc} <sup>o</sup>C</h1>

                    <h1 id='status'>{val.Status}</h1>
                    <img src={val.Icon} alt='asfa' id='icon'/>




                </div>
          
                </>
            )
        })
      } 

      </div>



    
    </>
  )
}

export default WeatherApp
