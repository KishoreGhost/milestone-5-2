import React, { useEffect, useState } from "react";
import axios from "axios";

const AddUser = ({ count }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [count]); 

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/get");
      setUserData(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleUserData = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/post", { id, name })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setId("");
        setName("");
        alert("User added");
        fetchData(); 
      })
      .catch((err) => {
        console.error(err);
      });
  };

  let userName = "No data found";
  if (userData) {
    const user = userData.find((user) => user.id === count);
    if (user) {
      userName = user.name;
    }
  }

  return (
    <>
      <p>User Name: {userName}</p>
      <form onSubmit={handleUserData}>
        <label>Enter user id</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <label>Enter user details</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Add User</button>
      </form>
    </>
  );
};

export default AddUser;
