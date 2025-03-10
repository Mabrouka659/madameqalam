// import styles from '../assets/css/contact.module.css';

// const ContactPage = () => {
//     return <>
     
        
//         <section className={styles["contact"]}>
//             <div className={styles["contactContainer"]}>
//             <h1>Contact</h1>  </div>

//             <div className={styles['nom']}>
                
//             <label for="">Nom:</label>

// <input type="text" name='' />


//             </div>
          



//         </section>
//     </>;
// };

// export default ContactPage;
import styles from '../assets/css/contact.module.css';
import { useState } from 'react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'rdv',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Message envoyé avec succès !'); // Tu pourras remplacer par un vrai envoi
    };

    return (
        <section className={styles["contact"]}>
            <h1>Contactez  Madame Qalam</h1>
            <form onSubmit={handleSubmit} className={styles["contact-form"]}>
                
                {/* Champ Nom et Prénom */}
                <div className={styles["form-group"]}>
                    <label htmlFor="name">Nom et Prénom</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                {/* Email */}
                <div className={styles["form-group"]}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                {/* Téléphone */}
                <div className={styles["form-group"]}>
                    <label htmlFor="phone">Téléphone</label>
                    <input 
                        type="tel" 
                        name="phone" 
                        id="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder="0148245678"
                    />
                </div>

                {/* Objet du message */}
                <div className={styles["form-group"]}>
                    <label htmlFor="subject">Objet du message</label>
                    <select 
                        name="subject" 
                        id="subject" 
                        value={formData.subject} 
                        onChange={handleChange}
                    >
                        <optgroup label="Particulier">
                            <option value="rdv">Prendre rendez-vous</option>
                            <option value="devis">Souhaiter un devis</option>
                            <option value="problem">Signaler un problème</option>
                        </optgroup>
                        <optgroup label="Professionnel">
                            <option value="rdv">Prendre rendez-vous</option>
                            <option value="devis">Souhaiter un devis</option>
                            <option value="problem">Signaler un problème</option>
                        </optgroup>
                    </select>
                </div>

                {/* Message */}
                <div className={styles["form-group"]}>
                    <label htmlFor="message">Votre message</label>
                    <textarea 
                        name="message" 
                        id="message" 
                    
                        value={formData.message} 
                        onChange={handleChange} 
                        required
                    ></textarea>
                </div>

                {/* Bouton Envoyer */}
                <button type="submit" className={styles["submit-btn"]}>Envoyer</button>
            </form>
        </section>
    );
};

export default ContactPage;
