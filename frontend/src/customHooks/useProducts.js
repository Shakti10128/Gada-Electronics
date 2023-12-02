import {useEffect,useState} from 'react'

const useProducts = () => {
    const [data,setData] = useState([]);

    useEffect(()=>{
        getData();
    },[])

    const getData = async()=>{
        const data = await fetch("http://localhost:4000/api/v1/products",{
        method:"GET",
        headers:{
            "Content-Type": "application/json",
        }
        });
        const product = await data.json();
        setData(product);
    }

    return data;
}

export default useProducts