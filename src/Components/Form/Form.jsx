import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from "../../firebase/firebaseConfig"
import styles from './Form.module.css'

const initialState = {
    name: "",
    lastname: "",
    city: "",
}

const Form = () => {
    const [userValues, setUserValues] = useState(initialState);
    
    const onChange = (e) => {
        const { name, value } = e.target;
        setUserValues({...userValues, [name]: value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
                const docRef = await addDoc(collection(db, 'compras'), userValues);
                console.log("Documento written with ID: ", docRef.id)
        } catch (error){
                console.log("Error adding document: ", e);
        }
        

    };

  return (
    <div className={styles.formContainer}>
        <h2>Shop</h2>
        <form onSubmit={onSubmit}>
            <div className={styles.inputForm}>
                <input type='text' name="name" placeholder='name' value={userValues.name} onChange={onChange}/>
                <input type='text' name="lastname" placeholder='lastname' value={userValues.lastname}  onChange={onChange}/>
                <input type='text' name="city" placeholder='city' value={userValues.city}  onChange={onChange}/>
            </div>
            <button type='submit'>Buy</button>
        </form>
    </div>
  )
}

export default Form