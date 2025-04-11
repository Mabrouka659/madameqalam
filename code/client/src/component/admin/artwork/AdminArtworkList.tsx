import { useEffect, useState } from "react"
import ArtworkAPI from "../../../service/artwork_api";
import type Artwork from "../../../model/artwork";
import { Link } from "react-router-dom";
import styles from "../../../assets/css/adminartworkForm.module.css";

const AdminArtworkList = () => {
    //état pour stocker les données
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    //récupere les données à l'affichage du composant
    useEffect(() => {
        new ArtworkAPI().selectAll().then((response) => setArtworks(response.data));
    }
        , []);
    return (     
         <div className={styles["admin-list-container"]}>
            <h2>Liste des oeuvres</h2>
            <p>
                <Link to={"/admin/artwork/form"}> Add</Link>
</p>
 <table >
 <thead>
                <tr>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Prix</th>
                    <th>Image</th>
                    <th>Categorie</th>
                </tr>
                </thead>
                <tbody>
                {artworks.map((artwork) => {
                    return (
                            <tr key={Math.random()}> 
                            <td> {artwork.name}</td>
                            <td>{artwork.description}</td>
                            <td>{artwork.price}</td>
                            <td>

                            {/* <img 
                                    src={`${import.meta.env.VITE_API_URL}/img/${(artwork.image[0] as unknown as Image)}`} 
                                    alt={artwork.name} 
                                /> */}
                                <img 
                                    src={`${import.meta.env.VITE_API_URL}/img/${artwork.image[0]?.name as string}`}
                                    alt="" 
                                />
                                {/* { JSON.stringify((artwork.image[0] as unknown as Image)) } */}
                            </td>
                            <td> {artwork.category.name} </td>
                            {/* {new Date (booking.date_time).} */}
                            <td>
                            <div className={styles["action-buttons"]}>
                                <Link className="btn" to={`/admin/artwork/form/${artwork.id}`}>Edit</Link>
                                <Link to={`/admin/artwork/delete/${artwork.id} `}>Delete</Link>
                                </div>
                            </td>
                        </tr>) 
                })}
                  </tbody>
            </table>
            </div>         
            ) ;  
}

export default AdminArtworkList;