// import React from 'react'

// function Admin() {
//   return (
//     <div className=' d-flex justify-content-center align-items-center bg-primary vh-100'>
//       <h2>Welcome, to Admin</h2>
//     </div>
//   )
// }

// export default Admin




// import React, { useState } from 'react';
// import axios from 'axios';

// function Admin() {
//   const [partyName, setPartyName] = useState('');
//   const [partyImage, setPartyImage] = useState(null);
//   const [message, setMessage] = useState('');

//   const handlePartyRegister = async (e) => {
//     e.preventDefault();
    
//     if (!partyName || !partyImage) {
//       setMessage("Please enter a party name and upload an image.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', partyName);
//     formData.append('image', partyImage);

//     try {
//       await axios.post('http://localhost:5000/parties', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setMessage("Party registered successfully!");
//       setPartyName('');
//       setPartyImage(null);
//     } catch (error) {
//       setMessage("Failed to register party.");
//     }
//   };

//   return (
//     <div className="text-center bg-primary vh-100 d-flex flex-column align-items-center justify-content-center">
//       <div className='bg-white'>
//       <h2>Admin Dashboard</h2>
//       <form onSubmit={handlePartyRegister}>
//         <input
//         class="form-control"
//           type="text"
//           placeholder="Party Name"
//           value={partyName}
//           onChange={(e) => setPartyName(e.target.value)}
//           required
//         /> <br />
//         <input
//         class="form-control"
//           type="file"
//           onChange={(e) => setPartyImage(e.target.files[0])}
//           accept="image/*"
//           required
//         /> <br />
//         <button className="btn btn-primary" type="submit">Register Party</button>
//       </form>
//       {message && <p>{message}</p>}
//       </div>
//     </div>
//   );
// }

// export default Admin;








import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';




function Admin() {
  const [partyName, setPartyName] = useState('');
  const [partyImage, setPartyImage] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [parties, setParties] = useState([]);
  const [editPartyId, setEditPartyId] = useState(null); // Track the ID of the party being edited
  const navigate = useNavigate();
  const [votingStatus, setVotingStatus] = useState(false);

  const handleStartVoting = async () => {
    try {
      const response = await axios.post('http://localhost:5000/start-voting');
      setVotingStatus(true);
      alert(response.data.message);
    } catch (error) {
      alert('Failed to start voting');
    }
  };

  const handleStopVoting = async () => {
    try {
      const response = await axios.post('http://localhost:5000/stop-voting');
      setVotingStatus(false);
      alert(response.data.message);
    } catch (error) {
      alert('Failed to stop voting');
    }
  };


  // Fetch all parties on component load
  useEffect(() => {
    fetchParties();
  }, []);

  const fetchParties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/parties');
      setParties(response.data);
    } catch (error) {
      setMessage("Failed to fetch parties.");
      setMessageType("error");
    }
  };

  const handlePartyRegisterOrUpdate = async (e) => {
    e.preventDefault();
    
    if (!partyName || (!partyImage && !editPartyId)) {
      setMessage("Please enter a party name and upload an image.");
      setMessageType("error");
      return;
    }

    const formData = new FormData();
    formData.append('name', partyName);
    if (partyImage) formData.append('image', partyImage); // Only add image if it exists

    try {
      if (editPartyId) {
        // Update party
        await axios.put(`http://localhost:5000/parties/${editPartyId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMessage("Party updated successfully!");
      } else {
        // Create new party
        await axios.post('http://localhost:5000/parties', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMessage("Party registered successfully!");
      }
      setMessageType("success");
      setPartyName('');
      setPartyImage(null);
      setEditPartyId(null);
      fetchParties(); // Refresh the list of parties
    } catch (error) {
      setMessageType("error");
      setMessage("Failed to register or update party.");
    }
  };

  const handleEditParty = (party) => {
    setEditPartyId(party.id);
    setPartyName(party.name);
    setPartyImage(null); // Reset image so the admin can choose a new one
  };

  const handleDeleteParty = async (partyId) => {
    if (window.confirm("Are you sure you want to delete this party?")) {
      try {
        await axios.delete(`http://localhost:5000/parties/${partyId}`);
        setMessage("Party deleted successfully.");
        setMessageType("success");
        fetchParties();
      } catch (error) {
        setMessageType("error");
        setMessage("Failed to delete party.");
      }
    }
  };

  const handleGoToUserDashboard = () => {
    navigate('/user-dashboard');
  };
  const handleGoToViewResult = () => {
    navigate('/result');
  };
  const handleGoToViewResults = () => {
    navigate('/results');
  };
  
  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token'); // Clear token from local storage
    navigate('/login'); // Redirect to login page
    alert('You have been logged out.');
  };
  
  return (
    <div className="mainadmin text-center bg-primary  d-flex flex-row  justify-content-center">
      <div className="bg-white p-4 rounded w-30 m-3">
      <div>
      <h2>Admin Dashboard</h2>
      <button onClick={handleStartVoting} className="btn btn-success ">Start Voting</button>&nbsp;
      <button onClick={handleStopVoting} className="btn btn-danger">Stop Voting</button>
      {/* <p>Voting is currently {votingStatus ? "Open" : "Closed"}</p> */}
    </div><hr />
        <h2>Register party:</h2>
        <form onSubmit={handlePartyRegisterOrUpdate}>
          <input
            className="form-control my-2"
            type="text"
            placeholder="Party Name"
            value={partyName}
            onChange={(e) => setPartyName(e.target.value)}
            required
          />
          <input
            className="form-control my-2"
            type="file"
            onChange={(e) => setPartyImage(e.target.files[0])}
            accept="image/*"
          />
          <button className="btn btn-primary w-100 mt-2" type="submit">
            {editPartyId ? "Update Party" : "Register Party"}
          </button>
        </form>
        {message && (
          <p className={`mt-3 ${messageType === 'success' ? 'text-success' : 'text-danger'}`}>
            {message}
          </p>
        )}

        <h4 className="mt-5"> Show Registered Parties:</h4>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Party Name</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parties.map((party, index) => (
              <tr key={party.id}>
                <td>{index + 1}</td>
                <td>{party.name}</td>
                <td>
                  <img
                    src={`http://localhost:5000${party.image_path}`}
                    alt={`${party.name} logo`}
                    width="80"
                    height="50"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning mx-1"
                    onClick={() => handleEditParty(party)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger mx-1"
                    onClick={() => handleDeleteParty(party.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div> <br /><br />
      <div className='d-flex flex-column bg-white w-25 rounded p-3 m-3'>
      <h2>Add Candidates:</h2>
        <Link className="btn btn-secondary  mt-3" to="/MNA">Add MNA</Link> 
        <Link className="btn btn-secondary  mt-3  " to="/MPA">Add MPA</Link>
        <h2>Go user dashboard:</h2>
        <button className="btn btn-secondary w-100 mt-3"onClick={handleGoToUserDashboard}>Go to User Dashboard</button>
        <h2>Results:</h2>
        <button className="btn btn-secondary w-100 mt-3"onClick={handleGoToViewResults}>View Result MNA</button>
        <button className="btn btn-secondary w-100 mt-3"onClick={handleGoToViewResult}>View Result MPA</button>
        <h2>Logout System:</h2>
        <button className="btn btn-secondary w-100 mt-3"onClick={handleLogout}>Logout System</button><hr />
        </div>
    </div>
    
  );
}

export default Admin;






