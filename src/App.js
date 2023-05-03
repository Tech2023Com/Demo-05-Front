import logo from './logo.svg';
import './App.css';
import { useState ,  useEffect } from 'react';
import axios from 'axios'




function App() {

  const [values , setValues ] =  useState({
    name : "",
    email  :""
  })

  const [data , setData] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:8990/get-data').then((res)=>{
      console.log(res)

      setData(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[data])

  const handleInputs =  (e) =>{

    setValues({...values , [e.target.name] : e.target.value })

  }

  const submit =  ()=>{
    console.log(values)
    axios.get('http://localhost:8990/add-data' , {params: values}).then((res)=>{
      console.log(res)
      alert(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
<>
    <input name='name' value={values.name} onChange={handleInputs} placeholder='Enter Name'  />
    <input name="email" value={values.email}  onChange={handleInputs}  placeholder='Enter Email' />
    <button onClick={submit} >Add</button>

    {data.map((el,i)=>(
      <h1> {i+1} {el.name} {el.email}</h1>
    ))}
    
</>
  );
}

export default App;
