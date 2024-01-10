import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BallotComponent = () => {
  const [ballots, setBallots] = useState([]);
  const [newBallot, setNewBallot] = useState({
    election: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    isOpen: true,
    fingerprint: '',
    extraCol1: '',
    extraCol2: '',
    isDeleted: false,
  });

  useEffect(() => {
    fetchBallots();
  }, []);

  const fetchBallots = () => {
    axios
      .get('http://localhost:8003/ballots')
      .then((response) => {
        console.log('API Response:', response.data); // Log the response
        setBallots(response.data);
      })
      .catch((error) => {
        console.error('Error fetching ballots:', error);
      });
  };
  

  const createBallot = () => {
    axios
      .post('http://localhost:8003/ballots/create', newBallot)
      .then((response) => {
        console.log('Ballot created:', response.data);
        setNewBallot({
          election: '',
          name: '',
          description: '',
          startDate: '',
          endDate: '',
          isOpen: true,
          fingerprint: '',
          extraCol1: '',
          extraCol2: '',
          isDeleted: false,
        });
        fetchBallots(); // Refresh the list of ballots after creating a new one
      })
      .catch((error) => {
        console.error('Error creating ballot:', error);
      });
  };
  

  return (
    <div>
      <h2>Ballot Management</h2>
      <div>
        <h3>Create New Ballot</h3>
        <input
          type="number"
          placeholder="Election Id"
          value={newBallot.election.id}
          onChange={(e) => setNewBallot({ ...newBallot, election: e.target.value })}
        />
        <input
          type="text"
          placeholder="Ballot Name"
          value={newBallot.name}
          onChange={(e) => setNewBallot({ ...newBallot, name: e.target.value })}
        />
        <textarea
          placeholder="Ballot Description"
          value={newBallot.description}
          onChange={(e) => setNewBallot({ ...newBallot, description: e.target.value })}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={newBallot.startDate}
          onChange={(e) => setNewBallot({ ...newBallot, startDate: e.target.value })}
        />
        <input
          type="date"
          placeholder="End Date"
          value={newBallot.endDate}
          onChange={(e) => setNewBallot({ ...newBallot, endDate: e.target.value })}
        />
        <button onClick={createBallot}>Create</button>
      </div>
      <div>
        <h3>Ballots</h3>
        {/* <ul>
          {ballots.map((ballot) => (
            <li key={ballot.ballot_id}>{ballot.ballot_name}</li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default BallotComponent;
