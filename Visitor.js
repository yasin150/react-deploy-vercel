// import React from 'react'
// import ptiLogo from './images/pti.png';
// import pmlnlogo from './images/pmlnn.png';
// import pplogo from './images/ppp.png';
// import { Link } from 'react-router-dom';

// function Visitor() {
//   return (
//     <div className='text-center bg-primary vh-100'>
//       <h2>Welcome, user for vote </h2><br /><br /><br />
//       <table class="table">
//   <thead className='table-dark'>
//     <tr>
//       <th scope="col">#</th>
//       <th scope="col">Party Name</th>
//       <th scope="col">Images</th>
      
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <th scope="row">1</th>
//       <td>PTI</td>
//       <td><img src={ptiLogo} alt="No image "  width="80" height="50"/></td>
      
//     </tr>
//     <tr>
//       <th scope="row">2</th>
//       <td>PMLN</td>
//       <td><img src={pmlnlogo} alt="No image "  width="80" height="50"/></td>
     
//     </tr>
//     <tr>
//       <th scope="row">3</th>
//       <td>PPP</td>
//       <td><img src={pplogo} alt="No image "  width="80" height="50"/> </td>
     
//     </tr>
   
//   </tbody>
  
// </table>
// <Link to="/halqa" className='btn btn-default border  bg-light'>Go for vote</Link>
//     </div>
    
//   )
// }

// export default Visitor









// import React, { useState } from 'react';
// import ptiLogo from './images/pti.png';
// import pmlnlogo from './images/pmlnn.png';
// import pplogo from './images/ppp.png';
// import { useNavigate } from 'react-router-dom';

// function Visitor() {
//   const [halqaNumber, setHalqaNumber] = useState(''); // Track selected halqa number
//   const [isVerified, setIsVerified] = useState(false); // Track if user has verified
//   const [showVerification, setShowVerification] = useState(false); // Control verification prompt visibility
//   const navigate = useNavigate();

//   const handleVoteClick = () => {
//     setShowVerification(true); // Show the halqa verification prompt
//   };

//   const handleVerify = () => {
//     if (halqaNumber) {
//       setIsVerified(true); // Mark as verified if a halqa number is selected
//       setShowVerification(false);
//       navigate('/halqa'); // Navigate to voting page
//     } else {
//       alert("Please select a halqa number to verify.");
//     }
//   };

//   return (
//     <div className="text-center bg-primary vh-100 d-flex flex-column align-items-center justify-content-center">
//       <h2>Welcome, user, for voting</h2>
//       <br /><br /><br />
//       <table className="table w-50">
//         <thead className="table-dark">
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">Party Name</th>
//             <th scope="col">Images</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <th scope="row">1</th>
//             <td>PTI</td>
//             <td><img src={ptiLogo} alt="PTI Logo" width="80" height="50" /></td>
//           </tr>
//           <tr>
//             <th scope="row">2</th>
//             <td>PMLN</td>
//             <td><img src={pmlnlogo} alt="PMLN Logo" width="80" height="50" /></td>
//           </tr>
//           <tr>
//             <th scope="row">3</th>
//             <td>PPP</td>
//             <td><img src={pplogo} alt="PPP Logo" width="80" height="50" /></td>
//           </tr>
//         </tbody>
//       </table>
//       <button onClick={handleVoteClick} className="btn btn-light border mt-3">
//         Go for vote
//       </button>

//       {showVerification && (
//         <div className="mt-3 border p-3 bg-light rounded">
//           <h4>Select your Halqa Number</h4>
//           <select
//             className="form-select my-2"
//             value={halqaNumber}
//             onChange={(e) => setHalqaNumber(e.target.value)}
//           >
//             <option value="">Select Halqa Number</option>
//             <option value="1">Halqa 1</option>
//             <option value="2">Halqa 2</option>
//             <option value="3">Halqa 3</option>
//             {/* Add more halqa options as needed */}
//           </select>
//           <button onClick={handleVerify} className="btn btn-primary mt-2">
//             Verify and Proceed
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Visitor;








// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


// function Visitor() {
//   const [parties, setParties] = useState([]);
//   const [halqaNumber, setHalqaNumber] = useState(''); // Track selected halqa number
//   const [isVerified, setIsVerified] = useState(false); // Track if user has verified
//   const [showVerification, setShowVerification] = useState(false); // Control verification prompt visibility
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleVoteClick = () => {
//     setShowVerification(true); // Show the halqa verification prompt
//   };

//   const handleVerify = () => {
//     if (halqaNumber === '2') {
//       setIsVerified(true); // Mark as verified if a halqa number is selected
//       setShowVerification(false);
//       navigate('/vote'); // Navigate to voting page
//     } else {
//       setErrorMessage("You are not eligible to vote. Only users from Halqa 2 can proceed.");
//     }
//   };

//   useEffect(() => {
//     const fetchParties = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/parties');
//         setParties(response.data);
//       } catch (error) {
//         console.error("Failed to fetch parties:", error);
//       }
//     };

//     fetchParties();
//   }, []);

//   return (
//     <div className="text-center bg-primary vh-100 d-flex flex-column align-items-center justify-content-center">
//       <h2>Welcome, user, for voting registered <br /> parties shows here below:</h2>
//       <table className="table w-50">
//         <thead className="table-dark">
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">Party Name</th>
//             <th scope="col">Image</th>
//           </tr>
//         </thead>
//         <tbody>
//           {parties.map((party, index) => (
//             <tr key={index}>
//               <th scope="row">{index + 1}</th>
//               <td>{party.name}</td>
//               <td>
//               <img src={`http://localhost:5000${party.image_path}`} alt={`${party.name} logo`} width="80" height="50" />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={handleVoteClick} className="btn btn-light border mt-3">
//          Go for vote
//        </button>

//       {showVerification && (
//         <div className="mt-3 border p-3 bg-light rounded">
//           <h4>Select your Halqa Number</h4>
//           <select
//             className="form-select my-2"
//             value={halqaNumber}
//             onChange={(e) => setHalqaNumber(e.target.value)}
//           >
//             <option value="">Select Halqa Number</option>
//             <option value="1">Halqa 1</option>
//             <option value="2">Halqa 2</option>
//             <option value="3">Halqa 3</option>
//           </select>
//           <button onClick={handleVerify} className="btn btn-primary mt-2">
//             Verify and Proceed
//           </button>
//         </div>
//           )}
//           {errorMessage && (
//         <div className="alert alert-danger mt-3">
//           {errorMessage}
//         </div>
//           )}
//     </div>
//   );
// }

// export default Visitor;







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Visitor() {
//   const [parties, setParties] = useState([]);
//   const [votingStatus, setVotingStatus] = useState(false);  // To track if voting is open
//   const [errorMessage, setErrorMessage] = useState('');
//   const [selectedParty, setSelectedParty] = useState(null);
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     const fetchVotingStatus = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/voting-status');
//         setVotingStatus(response.data.votingStatus);
//       } catch (error) {
//         console.error('Failed to fetch voting status:', error);
//       }
//     };

//     const fetchParties = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/parties');
//         setParties(response.data);
//       } catch (error) {
//         console.error("Failed to fetch parties:", error);
//       }
//     };

//     fetchVotingStatus();
//     fetchParties();
//   }, []);

//   const handleVoteClick = async () => {
//     if (!selectedParty) {
//       setErrorMessage('Please select a party to vote for.');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/vote', { partyId: selectedParty });
//       alert(response.data.message);
//       navigate('/thank-you'); // Redirect to a thank-you page after voting
//     } catch (error) {
//       setErrorMessage(error.response.data.error);
//     }
//   };
  
//   return (
//     <div className="text-center bg-primary vh-100 d-flex flex-column align-items-center justify-content-center">
//       <h2>Welcome, user! Here are the available parties:</h2>
//       <table className="table w-50">
//         <thead className="table-dark">
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">Party Name</th>
//             <th scope="col">Image</th>
//           </tr>
//         </thead>
//         <tbody>
//           {parties.map((party, index) => (
//             <tr key={index}>
//               <th scope="row">{index + 1}</th>
//               <td>{party.name}</td>
//               <td>
//                 <img src={`http://localhost:5000${party.image_path}`} alt={`${party.name} logo`} width="80" height="50" />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {votingStatus ? (
//         <div>
//           <select onChange={(e) => setSelectedParty(e.target.value)} className="form-select my-2">
//             <option value="">Select Party to Vote</option>
//             {parties.map((party, index) => (
//               <option key={index} value={party.id}>{party.name}</option>
//             ))}
//           </select>
//           <button onClick={handleVoteClick} className="btn btn-light mt-3">
//             Submit Vote
//           </button>
//         </div>
//       ) : (
//         <p>Voting is currently closed.</p>
//       )}

//       {errorMessage && (
//         <div className="alert alert-danger mt-3">
//           {errorMessage}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Visitor;















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Visitor() {
  const [parties, setParties] = useState([]);
  const [halqaNumber, setHalqaNumber] = useState(''); // Track selected halqa number
  const [votingStatus, setVotingStatus] = useState(false); // Check if voting is started
  const [showVerification, setShowVerification] = useState(false); // Control halqa verification prompt
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch registered parties and voting status
    const fetchInitialData = async () => {
      try {
        const [partiesRes, votingStatusRes] = await Promise.all([
          axios.get('http://localhost:5000/parties'),
          axios.get('http://localhost:5000/voting-status')
        ]);
        setParties(partiesRes.data);
        setVotingStatus(votingStatusRes.data.votingStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage('Failed to load data. Please try again later.');
      }
    };

    fetchInitialData();
  }, []);

  const handleVoteClick = () => {
    if (votingStatus) {
      setShowVerification(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Voting is currently closed.');
    }
  };

  const handleVerify = () => {
    if (halqaNumber === '1' || halqaNumber === '2') {
      // setShowVerification(false);
      navigate('/vote', { state: { halqaNumber } }); // Pass halqaNumber to the /vote page
    } else {
      setErrorMessage('You are not eligible to vote. Only users from Halqa 1 and Halqa 2 can proceed.');
      setHalqaNumber('');
    }
  };

  return (
    <div className="visitor text-center bg-primary vh-100 d-flex flex-column align-items-center justify-content-center">
      <h2>Welcome! Registered parties are listed below:</h2>
      <table className="table w-50">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Party Name</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>
          {parties.map((party, index) => (
            <tr key={party.id}>
              <th scope="row">{index + 1}</th>
              <td>{party.name}</td>
              <td>
                <img
                  src={`http://localhost:5000${party.image_path}`}
                  alt={`${party.name} logo`}
                  width="80"
                  height="50"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleVoteClick} className="btn btn-light border mt-3">
        Go for Vote
      </button>

      {showVerification && (
        <div className="mt-3 border p-3 bg-light rounded">
          <h4>Select Your Halqa Number</h4>
          <select
            className="form-select my-2"
            value={halqaNumber}
            onChange={(e) => setHalqaNumber(e.target.value)}
          >
            <option value="">Select Halqa Number</option>
            <option value="1">Halqa 1</option>
            <option value="2">Halqa 2</option>
            <option value="3">Halqa 3</option>
          </select>
          <button onClick={handleVerify} className="btn btn-primary mt-2">
            Verify and Proceed
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-danger mt-3">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default Visitor;
