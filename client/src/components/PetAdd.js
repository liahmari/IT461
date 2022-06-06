import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PetAdd= ({addHandler}) =>{
    
    const location = useLocation()
    const category = location.state.category
    const [name,setName] = useState('');
    const link = category === 2 ? "cats" : "dogs"
    const navigate = useNavigate();
    const formHandler = (e) => {
        e.preventDefault();
        if (!name) {
            alert('Name is required!');
            return;
        }
        addHandler({id:0,name},category);
        navigate(`/${link}`);
    }
    return (
        <form onSubmit={formHandler}>
            <div>
                <label style={{margin:20}}>Name</label>
                <input type="text" onChange={(e)=>{setName(e.target.value)}} />
                <button style={{margin:20}}>Add</button>
            </div>
        </form>
    );
}

export default PetAdd;