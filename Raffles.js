import './Raffles.css';
import React, { useState } from 'react';
import XLSX from 'xlsx';
import Chance from 'chance';

import AddName from './AddName';
import Contacts from './Contacts';
import useForm from './useForm';
import Winners from './Winners';

const Raffles = ({ contacts, setContacts, setError, setLoading }) => {
    const [displayAddNameForm, setDisplayAddNameForm] = useState(false);
    const [values, setValues] = useForm({ numWinners: 0 });
    const [winners, setWinners] = useState([]);

    let index = 0;
    let winnerIndex = 0;

    const pickwinner = e => {
        e.preventDefault();
        //creating array to add the winners to before all winners are chosen
        let allWinners = [];
        //I have found Math.random to be predictable, I therefore used Uint32Array instead 

        //Making an array of random numbers with a size of the requested number of winners
        let randomNumArray = new Uint32Array(values.numWinners);
        window.crypto.getRandomValues(randomNumArray);
        //going through the above random number array and thereby choosing a winner using Chance library
        for (let index = 0; index < values.numWinners; index++) {
            const randomNum = randomNumArray[index];
            const indexOfWinner = new Chance(randomNum).integer({ min: 0, max: contacts.length - 1 });
            //adding winner to array; if winner is already in array choose another random number array and start again from the previous index which failed to find a new winner
            if (!allWinners.includes(contacts[indexOfWinner])) {
                allWinners.push(contacts[indexOfWinner]);
            } else {
                randomNumArray = new Uint32Array(values.numWinners);
                window.crypto.getRandomValues(randomNumArray);
                --index;
            }
        }
        //setting the winners array as the state
        setWinners([...allWinners])
    }

    const excelContacts = e => {
        //set loading as true to enable the loading component until the file is finished loading
        setLoading(true);
        var files = e.target.files, f = files[0];
        var reader = new FileReader();
        reader.onload = e => {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, { type: 'array' });
            var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
            var data2 = XLSX.utils.sheet_to_json(first_worksheet, { header: 1, defval: '' }).map(row => {
                //chopping fourth columns and on if present
                let r = row.slice(0, 3);
                //validating data; all columns are strings not numbers or empty & that third column includes @ for email
                if (typeof r[0] !== 'string' || typeof r[1] !== 'string' || typeof r[2] !== 'string' || r.includes('') || !r[2].includes('@')) {
                    r = undefined;
                    //setting loading to false so that error is clickable
                    setLoading(false);
                    //showing error to user
                    setError('The excel file provided contains data that does not match the requirements.')
                }
                return r;
            });
            //cutting out invalid data
            data2 = data2.filter(row => row !== undefined);
            //if there are already names in array add the names from excel file to them otherwise make these names the contacts
            if (contacts.length) {
                setContacts([...contacts, ...data2]);
            } else {
                setContacts(data2);
            }
        };
        reader.readAsArrayBuffer(f);
    };

    //button to get to the form to add a name; if clicked - hide button & show form
    const addName = displayAddNameForm ? <AddName displayForm={setDisplayAddNameForm} setContacts={setContacts} contacts={contacts} /> : <button className="btn btn-outline-primary m-2" onClick={() => setDisplayAddNameForm(true)}>Add Name</button>;

    //if there are names in contacts populate table; otherwise show 'No names to show'
    const tableData = contacts.length ? contacts.map((c) => <Contacts key={index++} setLoading={setLoading} contact={c} setContacts={setContacts} index={index} allContacts={contacts} />) : <tr>
        <td colSpan='4'>No Names to Display</td>
    </tr>;

    const winnerIntro = winners.length > 1 ? <h3>And the winners are...</h3> : winners.length === 1 ? <h3>And the winner is...</h3> : null;

    //if there are winners show winners
    const winnersDisplay = winners.length ? winners.map(w => <Winners key={winnerIndex++} winner={w} />) : null;

    //make it easy to delete contacts with a button if there are at least two contacts
    const deleteAllNames = contacts.length > 1 ? <button className='btn btn-outline-primary m-2' onClick={() => setContacts([])}>Delete All Names</button> : null;

    return (
        <>
            <div className='container p-2'>
                <div className="row">
                    <div className="col-sm-5">
                        {/* hide default file input display and show bootstrap button instead */}
                        <label className="btn btn-outline-primary m-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="It is imperative that the excel file follows the format used in the table: First name, last name & email."
                        >
                            Import Names from Excel File
                            <input name="fileinput" type='file' style={{ display: 'none' }} onChange={excelContacts}
                                // enable file input more than once
                                onClick={e => e.target.value = null} />
                        </label>
                    </div>
                    <div className="col">
                        {addName}
                    </div>
                </div>
            </div>

            <form className="p-2" onSubmit={pickwinner}>
                <label>
                    How Many Winners: &nbsp;
                    <input style={{ width: '4em' }} name="numWinners" type="number" min={contacts.length ? '1' : '0'} max={contacts.length} value={values.numWinners} onChange={setValues} />
                </label>
                <button className="btn-outline-primary" type="submit">Pick Winners</button>
            </form>

            <div className="winners">
                {winnerIntro}
                {winnersDisplay}
            </div>

            <table className="table table-sm table-bordered m-auto pb-xs-5" id='nameTable'>
                <thead>
                    <tr>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Email</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>
            {deleteAllNames}

        </>
    )
}

export default Raffles;
