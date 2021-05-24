import './AddName.css';
import React from 'react';
import useForm from './useForm';

function AddName({ displayForm, setContacts, contacts }) {

    const [values, setValues] = useForm({ firstName: '', lastName: '', email: '' });

    const addName = e => {
        e.preventDefault();
        const valueArray = Object.values(values);
        if (contacts.length) {
            setContacts([...contacts, valueArray]);
        } else {
            setContacts([valueArray])
        }
        displayForm(false);
    }

    return (
        <>
            <div className='fixed-top fixed-left fixed-bottom'>
                <form className='container addName p-3' onSubmit={addName}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-10">
                            <input name="firstName" className="form-control" id="inputFirst" value={values.firstName} onChange={setValues} required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-10">
                            <input name="lastName" className="form-control" id="inputLast" value={values.lastName} onChange={setValues} required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type='email' name="email" className="form-control" id="inputEmail" value={values.email} onChange={setValues} required />
                        </div>
                        <div className="col-sm-10 m-auto p-3">
                            <button type="submit" className="btn btn-primary m-2">Submit</button>
                            <button className="btn btn-primary" onClick={() => displayForm(false)}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddName
