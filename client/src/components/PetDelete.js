import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PetDelete = ({deleteHandler}) =>{
    const location = useLocation();
    const pet = location.state.pet;
    const category = location.state.category
    const navigate = useNavigate();
    const [choice,setChoice] = useState(false);
    const link = category === 2 ? "cats":"dogs"
    const petCategory = category === 2 ? "Cat": "Dog"

    const formHandler = (e) =>{
        e.preventDefault();
        if(choice)
            deleteHandler(pet,category);
        navigate(`/${link}`);
    }
    return(
        <form onSubmit={formHandler}>
            <h3>Are you sure to delete {petCategory} entry?</h3>
            <div>
                <label style={{margin:20}}>ID: {pet.id}</label>
            </div>
            <div>
                <label style={{margin:20}}>Name: {pet.name}</label> 
            </div>
            <div style={{display:'inline-flex'}}>
                <button style={{margin:20}} onClick = {()=>setChoice(true)}>Yes</button>
                <button style={{margin:20}} onClick = {()=>setChoice(false)}>No</button>
            </div>
            
        </form>
    );
}

export default PetDelete;