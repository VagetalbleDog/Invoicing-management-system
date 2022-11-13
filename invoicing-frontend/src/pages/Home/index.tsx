import { useState } from 'react'
import Header from '@/components/Header'
const Home = ()=>{
    const [number,setNumber] = useState(1)
    return (
        <>
        <Header userName='朱文甫' />
        <h1>Hello world</h1>
        </>
    )
}

export default Home