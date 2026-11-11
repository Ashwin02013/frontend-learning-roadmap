



import {useState} from 'react';

function Usestate(){
    const[name , setName] = useState("Guest");
    const[age , setAge] = useState(0);
    const[isEmployed,setIsEmployed] = useState(false);

    const updateName = () =>{
        setName("Ashwin");
    }

    const updateAge = () =>{
        setAge(age+1);
    }

    const toggleEmployedStatus =() => {
        setIsEmployed(!isEmployed);
    }

    return (
        <div>
            <p>Name: {name}</p>
            <button onClick={updateName}>Set Name</button>

            <p>Age: {age}</p>
            <button onClick={updateAge}>increment age</button>

            <p>Is Employed: {isEmployed ? "yes" : "No"}</p>
            <button onClick={toggleEmployedStatus}>Toggle</button>
        </div>
    )
}

export default Usestate




