import {  useState, useRef } from "react";

export default function useForm(callback, validate, changeCb) {

        
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const fields = useRef({});
    const register = (name) => {
        fields.current[name] = true;
        return { onChange: (event) => setFormValue(event, name) }
    }
    const setFormValue = ($event, name) => {
        let value = $event?.target ? $event.target.value : $event;
        let error = validate(name, value);
        setErrors(val => { return { ...val, [name]: error } });
        setValues((val) => { return { ...val, [name]: value } });
        changeCb(name, value);
        return error;

    }
    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        let names = Object.keys(fields.current);
        let isError;
        for (let i = 0; i < names.length; i++) {
            let error = validate(names[i], values[names[i]]);
            if (error) {
                setErrors(val => { return { ...val, [names[i]]: error } });
                isError = true;
            }
        }
        !isError && callback();
        
    }
    return {
        values,
        setFormValue,
        errors,
        handleSubmit,
        register
    }
}