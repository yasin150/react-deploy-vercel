// import React, { useState } from 'react';
// import axios from 'axios';

// const Votee = ({ token }) => {
//   const [votes, setVotes] = useState({
//     AsgharJoiya: 0,
//     ZaheerChannar: 0,
//     AmjadBhutto: 0,
//   });
//   const [candidates, setCandidates] = useState(['AsgharJoiya', 'ZaheerChannar', 'AmjadBhutto'  ]);
//   // const [isAdmin, setIsAdmin] = useState(false);
//   // const [adminPassword, setAdminPassword] = useState('');
//   // const defaultPassword = 'admin123'; // Default password for admin access

//   const handleVote = async (candidate) => {
//     try {
//       await axios.post('http://localhost:5000/votee', {}, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       setVotes((prevVotes) => ({
//         ...prevVotes,
//         [candidate]: prevVotes[candidate] + 1,
//       }));
//       alert('Vote recorded');
//     } catch (error) {
//       alert('Not eligible to vote');
//     }
//   };

//   // const handleAdminLogin = () => {
//   //   if (adminPassword === defaultPassword) {
//   //     setIsAdmin(true);
//   //   } else {
//   //     alert('Incorrect password');
//   //   }
//   // };

//   // const addCandidate = (candidateName) => {
//   //   if (!candidates.includes(candidateName)) {
//   //     setCandidates([...candidates, candidateName]);
//   //     setVotes((prevVotes) => ({
//   //       ...prevVotes,
//   //       [candidateName]: 0,
//   //     }));
//   //   }
//   // };

//   // const removeCandidate = (candidateName) => {
//   //   setCandidates(candidates.filter(candidate => candidate !== candidateName));
//   //   const newVotes = { ...votes };
//   //   delete newVotes[candidateName];
//   //   setVotes(newVotes);
//   // };

//   // const totalVotes = candidates.reduce((total, candidate) => total + votes[candidate], 0);

//   return (
//     <div  className='mx-4 '>
//       <div className='bg-white p-3 rounded '>
//         <h4>E-Voting for (MPA)</h4>
//         {/* {isAdmin ? (
//           <div>
//             <h5>Admin Panel</h5>
//             <input type="text" placeholder="Add Candidate" id="newCandidate" />
//             <button onClick={() => {
//               const candidateName = document.getElementById('newCandidate').value;
//               addCandidate(candidateName);
//               document.getElementById('newCandidate').value = '';
//             }}>
//               Add Candidate
//             </button>
//             <ul>
//               {candidates.map(candidate => (
//                 <li key={candidate}>
//                   {candidate}
//                   <button onClick={() => removeCandidate(candidate)}>Remove</button>
//                 </li>
//               ))}
//             </ul>
//             <button onClick={() => setIsAdmin(false)}>Logout</button>
//           </div> */}
//         {/* ) : ( */}
//           {/* <div>
//             <input 
//               type="password" 
//               placeholder="Admin Password" 
//               value={adminPassword} 
//               onChange={(e) => setAdminPassword(e.target.value)} 
//             />
//             <button onClick={handleAdminLogin}>Login</button>
//           </div> */}
//         {/* )} */}
//         <ol>
//           {candidates.map(candidate => (
//             <li key={candidate}>
//               {candidate}: <br />
//               <button onClick={() => handleVote(candidate)} className='btn btn-primary'>Vote</button>
//             </li>
//           ))}
//         </ol>
//         {/* <h1>Total Votes: {totalVotes}</h1>
//         <div>
//           <h2>Current Vote Counts:</h2>
//           {candidates.map(candidate => (
//             <p key={candidate}>{candidate}: {votes[candidate]}</p>
//           ))}
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Votee;










// // 










// import React, { useState , useEffect} from 'react';
// import axios from 'axios';

// const Votee = ({ token }) => {
//   const [candidates, setCandidates] = useState(['AsgharJoiya', 'ZaheerChannar', 'AmjadBhutto']);
//   const [votedCandidate, setVotedCandidate] = useState(null); // Track which candidate the user voted for
//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/has-voted', {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         if (response.data.hasVoted) {
//           setVotedCandidate('You have already voted');
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching voting status:', error.message);
//       });
//   }, [token]);
//   const handleVote = (candidate) => {
//     axios
//       .post(
//         'http://localhost:5000/votee',
//         { candidate }, // Include candidate in the request payload
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then(() => {
//         setVotedCandidate(candidate); // Update state to reflect the voted candidate
//         alert('Vote recorded successfully for ' + candidate);
//       })
//       .catch((error) => {
//         console.error('Error recording vote:', error.message);
//         alert('You are not eligible to vote or an error occurred.');
//       });
//   };

//   return (
//     <div className="mx-4">
//       <div className="bg-white p-3 rounded">
//         <h4>E-Voting for (MPA)</h4>
//         {votedCandidate ? (
//           <p className="text-success">You have successfully voted for {votedCandidate}.</p>
//         ) : (
//           <ol>
//             {candidates.map((candidate) => (
//               <li key={candidate}>
//                 {candidate}: <br />
//                 <button
//                   onClick={() => handleVote(candidate)}
//                   className="btn btn-primary"
//                 >
//                   Vote
//                 </button>
//               </li>
//             ))}
//           </ol>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Votee;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Votee = ({ token }) => {
//   const [candidates, setCandidates] = useState([]);
//   const [votedCandidate, setVotedCandidate] = useState(null);

//   // Fetch candidates on component load
//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/candidates', {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         setCandidates(response.data.candidates);
//       })
//       .catch((error) => {
//         console.error('Error fetching candidates:', error.message);
//       });

//     axios
//       .get('http://localhost:5000/has-voted', {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         if (response.data.hasVoted) {
//           setVotedCandidate(response.data.candidate || 'You have already voted');
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching voting status:', error.message);
//       });
//   }, [token]);

//   const handleVote = (candidate) => {
//     axios
//       .post(
//         'http://localhost:5000/votee',
//         { candidate },
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then(() => {
//         setVotedCandidate(candidate);
//         alert(`Vote recorded successfully for ${candidate}`);
//       })
//       .catch((error) => {
//         console.error('Error recording vote:', error.message);
//         alert('You are not eligible to vote or an error occurred.');
//       });
//   };

//   return (
//     <div className="mx-4">
//       <div className="bg-white p-3 rounded">
//         <h4>E-Voting for (MPA)</h4>
//         {votedCandidate ? (
//           <p className="text-success">
//             {typeof votedCandidate === 'string'
//               ? votedCandidate
//               : `You have successfully voted for ${votedCandidate}.`}
//           </p>
//         ) : (
//           <ol>
//             {candidates.map((candidate) => (
//               <li key={candidate}>
//                 {candidate}: <br />
//                 <button
//                   onClick={() => handleVote(candidate)}
//                   className="btn btn-primary"
//                 >
//                   Vote
//                 </button>
//               </li>
//             ))}
//           </ol>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Votee;







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Votee = ({ token, onLogout }) => {
  const [candidates, setCandidates] = useState([]); // Store candidates list
  const [votedCandidate, setVotedCandidate] = useState(null); // Store the candidate the user voted for
  const [hasVoted, setHasVoted] = useState(false); // Check if the user has already voted
  const navigate = useNavigate();

  // Handle user logout
  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  // Fetch candidates and user's voting status on component load
  useEffect(() => {
    // Fetch candidates
    axios
      .get('http://localhost:5000/candidatess', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCandidates(response.data.candidates); // Set the fetched candidates
      })
      .catch((error) => {
        console.error('Error fetching candidates:', error.message);
      });

    // Check if the user has already voted
    axios
      .get('http://localhost:5000/has-votedd', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.hasVoted) {
          setVotedCandidate(response.data.candidate);
          setHasVoted(true); // User has already voted
        }
      })
      .catch((error) => {
        console.error('Error fetching voting status:', error.message);
      });
  }, [token]);

  // Handle vote submission
  const handleVote = (candidateName) => {
    axios
      .post(
        'http://localhost:5000/votee',
        { candidate: candidateName },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setVotedCandidate(candidateName);
        setHasVoted(true); // User successfully voted
        alert(`Vote recorded successfully for ${candidateName}`);
      })
      .catch((error) => {
        console.error('Error recording vote:', error.message);
        alert('You are not eligible to vote or an error occurred.');
      });
  };

  return (
    <div className="">
      <div className="bg-white p-4 rounded w-24">
        <h3>E-Voting System (MNA)</h3>

        {hasVoted ? (
          <p className="text-success">
            You have already voted for {votedCandidate}
          </p>
        ) : (
          <div>
            <h5>Available Candidates:</h5>
            <ul className="list-group">
              {candidates.map((candidate, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between">
                  <span>
                    {candidate.name} ({candidate.party_name})
                  </span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleVote(candidate.name)}
                  >
                    Vote
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* <button className="btn btn-danger mt-3" onClick={handleLogoutClick}>
          Logout
        </button> */}
      </div>
    </div>
  );
};

export default Votee;