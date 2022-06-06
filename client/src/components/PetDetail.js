import { Link, useLocation } from "react-router-dom";

const PetDetail = () =>{
    const location = useLocation()
    console.log(location)
    const category = location.state.category
    const pet = location.state.pet
    const petCategory = category === 2 ? "Cat": "Dog"
    const link = category === 2 ? "cats":"dogs"
    
    return(
        <div>
            <h1> {petCategory} Detail</h1>
            <div>
                ID: {pet.id}
            </div>
            <div>
                Name: {pet.name}
            </div>
            <div>
                <Link to={`/${link}`}>Back to {petCategory}s List</Link>
            </div>
        </div>
    );
}

export default PetDetail;