import { useEffect, useState } from "react"
import ContactAPI from "../../../service/contact_api";
import Contact from "../../../model/contact";
import { Link } from "react-router-dom";

const AdminContactList = () => {
    //état pour stocker les données
    const [contacts, setContacts] = useState<Contact[]>([]);

    //récupere les données à l'affichage du composant
    useEffect(() => {
        new ContactAPI().selectAll().then((response) => setContacts(response.data));
    }
        , []);


    return (
        <>
            <h2>Contact List</h2>
            <p>
                <Link to={"/admin/contact/form"}> Add</Link>
</p>
         <table>
                <tr>
                    <th>Email</th>
                    <th>Description</th>
                    <th>Message</th>
                   
                </tr>



                <tr>

                    {contacts.map((contacts) => {

                        return (
                            <td key={Math.random()}>
                                <td> {contacts.email}</td>
                                <td>{contacts.description}</td>
                                <td>{contacts.message}</td>
                               


                                {/* {new Date (booking.date_time).} */}



                            </td>


                        );



                    })

                    }
                    <td>

                        <Link to={""}>Edit</Link>
                        <Link to={""}>Delete</Link>
                    </td>


                </tr>
            </table>




            {contacts.map((contact) => {
                return <p key={Math.random()}> {contact.email} </p>;

            }

            )

            }
        </>);
}

export default AdminContactList