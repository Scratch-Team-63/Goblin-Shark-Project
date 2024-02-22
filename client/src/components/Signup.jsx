import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameEmpty, setUsernameEmpty] = useState(false);
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = event => {
    event.preventDefault();
    if(!username) setUsernameEmpty(true);
    if(!password) setPasswordEmpty(true);
    if(!isUsernameEmpty && !isPasswordEmpty){
      fetch('http://localhost:3000/signUp', {
        method:'POST',
        headers: {
          'Content-Type':'Application/JSON'
        },
        body:JSON.stringify({username, password})
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        navigate('/main'); // navigate to the main container page
      })
      .catch(err => console.log('Signup fetch/signup: Error', err));
    }
  };

  return (
    <Box as="form" onSubmit={handleSignUp} p={5} shadow="md" borderWidth="1px">
      <FormControl id="username" isRequired>
        <FormLabel>Username</FormLabel>
        <Input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </FormControl>
      <FormControl id="password" isRequired mt={6}>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </FormControl>
      <Button colorScheme="blue" type="submit" value="Create User" mt={6}>
        Create User
      </Button>
    </Box>
  );
}

export default Signup;