import { Link } from "react-router-dom";

const PetCard = ({pet,category}) => {
    const link = category === 2 ? "cats":"dogs"
    return (
        <>
            <td>{pet.id}</td>
            <td>{pet.name}</td>
            <td>
                <Link to={`/${link}/view/${pet.id}`} state={{pet,category}}> View </Link> |
                <Link to={`/${link}/edit/${pet.id}`} state={{pet,category}}> Edit </Link> |
                <Link to={`/${link}/delete/${pet.id}`} state={{pet,category}} > Delete </Link>
            </td>
        </>
    );
}

export default PetCard;