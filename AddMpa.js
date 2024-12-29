import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMpa = () => {
  const [newCandidate, setNewCandidate] = useState('');
  const [partyName, setPartyName] = useState('');
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/candidates')
      .then(response => setCandidates(response.data.candidates))
      .catch(err => console.error('Error fetching candidates:', err.message));
  }, []);

  const addCandidate = () => {
    if (!newCandidate || !partyName) {
      alert('Candidate and party name are required');
      return;
    }

    axios.post('http://localhost:5000/add-candidate', {
      candidate: newCandidate,
      party_name: partyName
    })
      .then(() => {
        setCandidates([...candidates, { name: newCandidate, party_name: partyName }]);
        setNewCandidate('');
        setPartyName('');
        alert('Candidate added successfully');
      })
      .catch(err => console.error('Error adding candidate:', err.message));
  };

  const deleteCandidate = (name) => {
    axios.delete(`http://localhost:5000/delete-candidate/${name}`)
      .then(() => {
        setCandidates(candidates.filter(candidate => candidate.name !== name));
        alert('Candidate deleted successfully');
      })
      .catch(err => console.error('Error deleting candidate:', err.message));
  };

  return (
    <div className="mna text-center bg-primary vh-100 d-flex flex-column  justify-content-center ml-10">
      <div className='bg-white p-3 rounded w-25  '>
        <div className=''>
      <h2 className='text-center'>Add MPA</h2>
      <input
      className='form-control '
        type="text"
        placeholder="Candidate Name"
        value={newCandidate}
        onChange={e => setNewCandidate(e.target.value)}
      />
      <input
      className='form-control my-2 '
        type="text"
        placeholder="Party Name"
        value={partyName}
        onChange={e => setPartyName(e.target.value)}
      />
      <button onClick={addCandidate} className='btn btn-primary my-2'>Add Candidate</button>

      <h2>Candidate List:</h2>
      <ul>
        {candidates.map(candidate => (
          <li key={candidate.name}>
            {candidate.name} ({candidate.party_name}) 
            <button className='btn btn-danger my-2' onClick={() => deleteCandidate(candidate.name)}>Delete</button><hr />
          </li>
        ))}
      </ul>
      </div>
      </div>
    </div>
  );
};

export default AddMpa;
