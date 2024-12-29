import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Votee from './Votee';


const Vote = ({ token, onLogout }) => {
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
      .get('http://localhost:5000/candidates', {
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
      .get('http://localhost:5000/has-voted', {
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
        'http://localhost:5000/vote',
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
    <div className="vote d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className=" bg-white p-3 rounded w-24"> 
        <h3 >E-Voting System (MPA)</h3>

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
      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Votee token={token} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className="btn btn-danger mt-3" onClick={handleLogoutClick}>
          Logout
        </button>
    </div>
  );
};

export default Vote;











// import React, { useState } from 'react';

// const Vote = ({ candidates }) => {
//   const [votes, setVotes] = useState(
//     candidates.reduce((acc, candidate) => ({ ...acc, [candidate]: 0 }), {})
//   );

//   const handleVote = (candidate) => {
//     setVotes((prevVotes) => ({
//       ...prevVotes,
//       [candidate]: prevVotes[candidate] + 1,
//     }));
//     alert(`Vote cast for ${candidate}`);
//   };

//   return (
//     <div className="vote-panel bg-primary vh-100 d-flex justify-content-center align-items-center">
//       <div className="bg-white p-3 rounded w-50">
//         <h3>Vote for Your Candidate</h3>
//         <ol>
//           {candidates.map(candidate => (
//             <li key={candidate}>
//               {candidate}
//               <button onClick={() => handleVote(candidate)} className="btn btn-primary mx-2">
//                 Vote
//               </button>
//             </li>
//           ))}
//         </ol>
//         <h4>Vote Counts:</h4>
//         {candidates.map(candidate => (
//           <p key={candidate}>{candidate}: {votes[candidate]}</p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Vote;

