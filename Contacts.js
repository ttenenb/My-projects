import React, { useEffect, useRef, useState } from 'react'
import Edit from './Edit';
import IndividualContact from './IndividualContact';

function Contacts({ contact, setContacts, allContacts, setLoading }) {
    const [deleted, deleteContact] = useState(false);
    const [inEditMode, editContact] = useState(false);
    const [individualContact, setIndividualContact] = useState(contact);
    const allcontactsRef = useRef();

    useEffect(() => {
        //set loading to false once names are being added to table
        setLoading(false);
        if (deleted) {
            //set individual contact to null
            setIndividualContact();
            deleteContact(false);
            //useRef to adjust contacts and erase the deleted contact from the contacts as well in 2 steps
            allcontactsRef.current = allContacts.filter(c => c !== individualContact);
            setContacts(allcontactsRef.current);
        } else {
            setIndividualContact(contact)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleted, allcontactsRef, setContacts, contact])

    //make edit and delete buttons for every contact
    const editRow = individualContact && !inEditMode ? <td ><button className="btn btn-outline-primary mr-1 btn-sm" onClick={() => editContact(true)}>Edit</button><button className="btn btn-outline-primary mr-1 btn-sm" onClick={() => deleteContact(true)}>Delete</button></td> : null;

    //if edit is clicked open edit component otherwise open individualcontact component
    const populateCells = contact && !inEditMode ? <IndividualContact contact={individualContact} editButtons={editRow} /> : contact && inEditMode ? <Edit contact={individualContact} displayEditMode={editContact} setContacts={setContacts} allContacts={allContacts} /> : null;
    return (
        <>
            {populateCells}
        </>
    )
}


export default Contacts
