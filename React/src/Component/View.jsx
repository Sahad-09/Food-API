import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '/View.css'
export default function View() {
const [data,setData]=useState([])

    const GetData=async()=>{
        await axios.get('http://localhost:5000/api/user/viewfood')
        .then((res)=>{
            console.log(res.data);
            setData(res.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }


    useEffect(()=>{
console.log('hello ');
GetData()



    },[])
console.log(data,'DATA');

const AddToCard=(item)=>{
    console.log('Added to Card');
    console.log(item);


    await axios.get('http://localhost:5000/api/user/addtocard',)
    .then((res)=>{
        console.log(res.data);
        setData(res.data.data)
    })
    .catch((err)=>{
        console.log(err);
    })
}

  return (
    <>
    <div className="mainCard">
        <h1>Cards</h1>
        {data.map((item,index)=>{
                return(
                    <>
                    <div className="singleCard">
                     <h1>{item.itemName}</h1>
                     <p>{item.description}</p>
                     <h4>{item.price}</h4>
<button onClick={()=>AddToCard(item)}>Add to card</button>


            </div>
                    </>
                )
            })}
            {/* {data} */}
        
       

    </div>

    </>


  )
}
