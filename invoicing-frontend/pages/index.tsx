import React,{lazy, useEffect, useState} from 'react';
import dynamic from "next/dynamic";

const Home = dynamic(()=>import('../components/Home'),{ssr:true});
const Login = dynamic(()=>import('../components/login'),{ssr:false});
const App:React.FC = ()=>{
  const [logged,setLogged] = useState(false);
  useEffect(()=>{
    if(sessionStorage.getItem('key')){
      setLogged(true)
    }
  })
  if(logged){
    return <Home setLog={setLogged}/>
  }else{
    return <Login setLog={setLogged}/>
  }
}

export default App;