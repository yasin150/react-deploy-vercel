// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddMna = ({ token }) => {
//   const [candidatess, setCandidates] = useState([]);
//   const [newCandidate, setNewCandidate] = useState('');

//   useEffect(() => {
//     // Fetch the current list of candidates
//     axios
//       .get('http://localhost:5000/candidatess', {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         setCandidates(response.data.candidatess);
//       })
//       .catch((error) => {
//         console.error('Error fetching candidatess:', error.message);
//       });
//   }, [token]);

//   const addCandidate = () => {
//     if (!newCandidate.trim()) {
//       alert('Please enter a valid candidate name');
//       return;
//     }

//     axios
//       .post(
//         'http://localhost:5000/add-candidates',
//         { candidate: newCandidate },
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then(() => {
//         setCandidates([...candidatess, newCandidate]); // Update state
//         setNewCandidate(''); // Clear input
//         alert('Candidate added successfully');
//       })
//       .catch((error) => {
//         console.error('Error adding candidates:', error.message);
//         alert('Error adding candidates');
//       });
//   };

//   const deleteCandidate = (candidate) => {
//     axios
//       .delete(`http://localhost:5000/deletes-candidates/${candidate}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(() => {
//         setCandidates(candidatess.filter((c) => c !== candidate)); 
//         alert(`Candidate ${candidate} deleted successfully`);
//       })
//       .catch((error) => {
//         console.error('Error deleting candidate:', error.message);
//         alert('Error deleting candidate');
//       });
//   };

//   return (
//     <div className="admin-panel text-center bg-primary vh-100 d-flex flex-column align-items-center justify-content-center">
//       <div className="bg-white p-4 rounded w-50">
//         <h4>Manage Candidates for MNA</h4>
//         <ul>
//           {candidatess.map((candidate) => (
//             <li key={candidate}>
//               {candidate}
//               <button
//                 className="btn btn-danger btn-sm mx-2"
//                 onClick={() => deleteCandidate(candidate)}
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//         <input
//           className="form-control"
//           type="text"
//           placeholder="New Candidate Name"
//           value={newCandidate}
//           onChange={(e) => setNewCandidate(e.target.value)}
//         />
//         <button className="btn btn-secondary w-100 mt-3" onClick={addCandidate}>
//           Add Candidate
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddMna;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMna = () => {
  const [newCandidate, setNewCandidate] = useState('');
  const [partyName, setPartyName] = useState('');
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/candidatess')
      .then(response => setCandidates(response.data.candidates))
      .catch(err => console.error('Error fetching candidates:', err.message));
  }, []);

  const addCandidate = () => {
    if (!newCandidate || !partyName) {
      alert('Candidate and party name are required');
      return;
    }

    axios.post('http://localhost:5000/add-candidates', {
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
    axios.delete(`http://localhost:5000/delete-candidates/${name}`)
      .then(() => {
        setCandidates(candidates.filter(candidate => candidate.name !== name));
        alert('Candidate deleted successfully');
      })
      .catch(err => console.error('Error deleting candidate:', err.message));
  };

  return (
    <div className="mna text-center bg-primary vh-100 d-flex flex-column  justify-content-center  ml-10">
      <div className='bg-white p-3 rounded w-25'>
      <h2 className='text-center'>Add MNA</h2>
      <input
      className='form-control '
        type="text"
        placeholder="Candidate Name"
        value={newCandidate}
        onChange={e => setNewCandidate(e.target.value)}
      />
      <input
      className='form-control my-2'
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
            <button className='btn btn-danger my-2' onClick={() => deleteCandidate(candidate.name)}>Delete</button> <hr />
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default AddMna;
