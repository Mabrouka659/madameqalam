import { useEffect, useState } from "react"
import ArtworkAPI from "../../../service/artwork_api";
import Artwork from "../../../model/artwork";
import { Link } from "react-router-dom";

const AdminArtworkList = () => {
    //état pour stocker les données
    const [artworks, setArtworks] = useState<Artwork[]>([]);

    //récupere les données à l'affichage du composant
    useEffect(() => {
        new ArtworkAPI().selectAll().then((response) => setArtworks(response.data));
    }
        , []);
    return (
        <>
            <h2>Artwork List</h2>
            <p>
                <Link to={"/admin/artwork/form"}> Add</Link>
</p>
 <table >
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Category</th>
                </tr>
                {artworks.map((artwork) => {
                    return (
                       
                            <tr key={Math.random()}>
                              <img src={`${import.meta.env.VITE_API_URL}/imag/${artwork.image}`} />
                         
                            <td> {artwork.name}</td>
                            <td>{artwork.description}</td>
                            <td>{artwork.price}</td>
                            <td>{'artwork.image'}</td>
                            <td> {artwork.category.name} </td>
                            {/* {new Date (booking.date_time).} */}
                            <td>

                                <Link to={""}>Edit</Link>
                                <Link to={""}>Delete</Link>
                            </td>
                        </tr>) ;
                })}
            </table>
           
            </>         
            )   
}

export default AdminArtworkList;