import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, FormLabel, Input, Button } from "@chakra-ui/react";

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
    <Flex width="full" height="100vh" align="center" justifyContent="center">
      <Box as="form" onSubmit={handleSignUp} p={5} shadow="md" borderWidth="1px" width="full" maxW="500px">
        <FormControl id="username" isRequired>
          <FormLabel fontSize="lg">Username</FormLabel>
          <Input fontSize="lg" type="text" value={username} onChange={e => setUsername(e.target.value)} width="full" border="1px solid" borderColor="gray.500" />
        </FormControl>
        <FormControl id="password" isRequired mt={6}>
          <FormLabel fontSize="lg">Password</FormLabel>
          <Input fontSize="lg" type="password" value={password} onChange={e => setPassword(e.target.value)} width="full" border="1px solid" borderColor="gray.500" />
        </FormControl>
        <Button colorScheme="blue" type="submit" value="Create User" mt={6}>
          Create User
        </Button>
      </Box>
    </Flex>
  );
}

export default Signup;