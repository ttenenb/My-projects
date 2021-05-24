import { useState } from 'react'

//A terrific custom hook by my instructor Mr.Stephen Lubowsky 

function useForm(initialFormValues) {
    const [formValues, setFormValues] = useState(initialFormValues);

    return [
        formValues,
        e => setFormValues({ ...formValues, [e.target.name]: e.target.value })
    ]
}

export default useForm
