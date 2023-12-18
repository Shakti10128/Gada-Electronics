import React,{useState,useEffect} from 'react'
import { ProductContainer } from '../../Home/Home'
import Pagination from "react-js-pagination";
import './Products.css'
// import Loader from '../../../utils/loader/Loader';
import toast from 'react-hot-toast';

const Products = () => {
  const [data,setData] = useState();
  const [searchQuery,setSearchQuery] = useState("");
  const [pageNo,setPageNo] = useState(1);
  // console.log(searchQuery);

    useEffect(()=>{
        getData();
    },[searchQuery,pageNo])

    const getData = async()=>{
      try {
        let url = `http://localhost:4000/api/v1/products?page=${pageNo}`;
        if(searchQuery !== ''){
          url = `http://localhost:4000/api/v1/products?keyword=${searchQuery}`
        }
          const data = await fetch(url,{
          method:"GET",
          headers:{
              "Content-Type": "application/json",
          }
          });
          const product = await data.json();
          setData(product);
        } catch (error) {
          toast.error("Something went wrong");
          return;
      }
    }

    const PaginationHandler = (e)=>{
      setPageNo(e)
    }


  return (
    <>
    <div>
      <div className='searchFeature' id='searchFeature'>
        <input type="text" className='searchInput' placeholder='Search'
        onChange={(e)=>setSearchQuery(e.target.value)}/>
        <button className='searchButton'>Search</button>
      </div>
      <ProductContainer products={data?.data}/>

      <div  className="paginationComponent" href="#searchFeature">
          <Pagination
              firstPageText={"First"}
              lastPageText={"Last"}
              prevPageText={"<"}
              nextPageText={">"}
              activePage={pageNo}
              itemsCountPerPage={8}
              totalItemsCount={data ? data?.productCount : 0}
              pageRangeDisplayed={3}
              onChange={(e)=>PaginationHandler(e)}
            />
      </div>

    </div>
    </>
  )
}

export default Products