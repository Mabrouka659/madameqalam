import { useEffect, useState } from "react"
import ArtworkAPI from "../../../service/artwork_api";
import type Artwork from "../../../model/artwork";
import { Link } from "react-router-dom";
import type Image from "../../../model/image";

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
                            
                            <td> {artwork.name}</td>
                            <td>{artwork.description}</td>
                            <td>{artwork.price}</td>
                            <td>
                                {/* <img src={`${import.meta.env.VITE_API_URL}/img/${(artwork.image[0])}`} /> */}
                                { JSON.stringify((artwork.image[0] as unknown as Image)) }
                            </td>
                            <td> {artwork.category.name} </td>
                            {/* {new Date (booking.date_time).} */}
                            <td>

                                <Link className="btn" to={`/admin/artwork/form/${artwork.id}`}>Edit</Link>
                                <Link to={`/admin/artwork/delete/${artwork.id} `}>Delete</Link>
                            </td>
                        </tr>) ;
                })}
            </table>
           
            </>         
            )   
}

export default AdminArtworkList;