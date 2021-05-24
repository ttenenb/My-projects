import React from 'react';

function IndividualContact({ contact, editButtons }) {
    let indexCell = 0;
    //populate each contact with its data
    const populateCells = contact ? contact.map(c => <td key={indexCell++}> {c} </td>) : null;

    return (
        <>
            <tr>
                {populateCells}
                {/* add the edit and delete buttons */}
                {editButtons}
            </tr>
        </>
    )
}

export default IndividualContact
