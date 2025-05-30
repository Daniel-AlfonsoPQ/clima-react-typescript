import { useState } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import type { SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
    fecthWeather: (search: SearchType) => Promise<void>;
}

export default function Form({fecthWeather}: FormProps) {

    const [ search, setSearch ] = useState<SearchType>({
        city: '',
        country: ''
    });

    const [ alert, setAlert ] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSearch({
            ...search,
            [name]: value
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(Object.values(search).includes('')) {
            setAlert('Todos los campos son obligatorios');
            return;
        }

        fecthWeather(search);
    }

  return (
    <form 
        className={styles.form}
        onSubmit={handleSubmit}
    >
      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad:</label>
        <input 
            type="text" 
            id="city" 
            name="city" 
            placeholder="Ciudad"
            value={search.city}
            onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="country">Pais:</label>
        <select 
            value={search.country} 
            name="country" 
            id="country"
            onChange={handleChange}
        >
            <option value="">--Selecciona un país</option>
            {countries.map((country) => (
            <option key={country.code} value={country.code}>
                {country.name}
            </option>
            ))}
        </select>
      </div>

      <input className={styles.submit} type="submit" value='Consultar Clima' />
    </form>
  );
}
