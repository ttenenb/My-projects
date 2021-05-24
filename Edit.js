import './Edit.css';
import React, { useRef } from 'react';
import useForm from './useForm';

function Edit({ contact, displayEditMode, setContacts, allContacts }) {
    //start with pulling the original data into an object with the appropriate name
    const contactKeys = { firstName: '', lastName: '', email: '' };
    let index = 0;
    Object.keys(contactKeys).map(c => contactKeys[c] = contact[index++]);
    //now we are set up to use controlled components
    //we initiate the values with the contact original data
    const [values, setValues] = useForm(contactKeys);
    const setcontactsRef = useRef();

    const submit = e => {
        e.preventDefault();
        //save the edited contact into the contacts list
        setcontactsRef.current = allContacts.map(c => {
            if (c === contact) {
                //we get rid of the keys as the contacts are arrays not objects
                return c = Object.values(values);
            }
            return c;
        })
        setContacts(setcontactsRef.current);

        //show contacts in regular mode - not in edit mode
        displayEditMode(false)
    }

    return (
        <>
            <tr>
                <td colSpan='4'>
                    <form onSubmit={submit}>
                        <div className="form-row edit">
                            <div className="col">
                                <input name="firstName" className="form-control" id="inputFirst" value={values.firstName} onChange={setValues} /></div>
                            <div className="col">
                                <input name="lastName" className="form-control" id="inputLast" value={values.lastName} onChange={setValues} />
                            </div>
                            <div className="col">
                                <input name="email" className="form-control" id="inputEmail" value={values.email} onChange={setValues} />
                            </div>
                            <button className="btn btn-outline-primary mr-1 btn-sm" type="submit">Save</button>
                            <button className="btn btn-outline-primary mr-1 btn-sm" onClick={() => displayEditMode(false)}>Cancel</button>
                        </div>
                    </form>
                    {/* disable other buttons */}
                    <div className='fixed-top fixed-left fixed-bottom'>

                    </div>
                </td>
            </tr>
        </>
    )
}

export default Edit
