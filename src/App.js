import './App.css';
import data from './q2.json'
import React, { useEffect, useState } from 'react';

function App() {
  const [person, setPerson] = useState(data);
  const [addForm, setAddForm] = useState({
    id: 0,
    name: "",
    dob:"",
    gender: "",
    score: ""
  });

  const handleAdd = () => {
    const newId = person.length > 0 ? person[person.length - 1].id + 1 : 1

    const newPerson = {
      id: newId,
      name: name,
      dob: dob,
      gender: gender,
      score: score,
    };
    if (name.length === 0) {
      alert('Full name not empty')
    } else {
      setPerson([...person, newPerson]);
    }

  };
  const [gender, setGender] = useState("Male");
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [score, setScore] = useState('')

  const handleClickAdd = (e) => {
    e.preventDefault();
    const cloneData = [...person];
    cloneData.push({ ...addForm, id: person.length + 1 });

    setPerson(cloneData);
  };

  const handleDelete = (id) =>{
    const personDelete = [...person]
    const index = personDelete.findIndex(p=>p.id == id)
    if(window.confirm('Do you want to delete this student?')){
      personDelete.splice(index,1)
      setPerson(personDelete)
    }
  }

  const [listSearch, setListSearch] = useState("");

  const handleSearch = (e) =>{
    e.preventDefault();
    const search = document.getElementById('search').value;
    console.log(search)
    if(!search){
      setListSearch("")
      return;
    }
    let searchResult = person.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

    setListSearch(searchResult);
  }


  return (
    <div className="App">
      <h3>LIST STUDENTS</h3>
      <input id='search' type="text" name="name" placeholder='Enter a fullname to search...'/>
      <button onClick={handleSearch}>Search</button>


      <table>
        <tr>
          <th>FullName</th>
          <th>Date of Birth</th>
          <th>Gender</th>
          <th>Score</th>
          <th>Action</th>
        </tr>
       {listSearch? listSearch.map((p, index) =>
          <tr key={index}>
            {/* <td>{p.id}</td> */}
            <td>{p.name}</td>
            <td>{p.dob}</td>
            <td>{p.gender}</td>
            <td>{p.score}</td>
            <td onClick={()=>handleDelete(p.id)}>Delete</td>
          </tr>
        ): person.map((p, index) =>
          <tr key={index}>
            {/* <td>{p.id}</td> */}
            <td>{p.name}</td>
            <td>{p.dob}</td>
            <td>{p.gender}</td>
            <td>{p.score}</td>
            <td><button onClick={()=>handleDelete(p.id)}>Delete</button></td>
          </tr>
        )}
      </table>
      <div>
        <h3>Add a Student</h3>
        <input placeholder='Enter a fullname' required
          onChange={(e) => setName(e.target.value)} value={name} ></input>
        <input type={"date"} onChange={(e) => setDob(e.target.value)} value={dob} required></input>
        <input type="text" placeholder="Enter a gender" onChange={(e) => setGender(e.target.value)} name="gender"></input>
        <input placeholder='Enter a score' onChange={(e) => setScore(e.target.value)} value={score} ></input>
        <button onClick={handleAdd}>Add</button>

      </div>
    </div>

  );
}

export default App;