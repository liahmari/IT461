import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PetEdit = ({updateHandler}) =>{
    const location = useLocation()
    const category = location.state.category
    const pet = location.state.pet
    const link = category === 2 ? "cats":"dogs"
    const [name,setName] = useState(pet.name);
    const navigate = useNavigate();
    const formHandler = (e) => {
        e.preventDefault();
        if (!name) {
            alert('Name is required!');
            return;
        }
        pet.name = name;
        updateHandler(pet,category);
        navigate(`/${link}`);
    }
    return (
        <form onSubmit={formHandler}>
            <div>
                <label style={{margin:20}}>ID: {pet.id}</label>
                <label style={{margin:20}}>Name</label>
                <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
                <button style={{margin:20}}>Update</button>
            </div>
        </form>
    );
}

export default PetEdit;