import React, { useState, Component } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, Flex, FormControl, FormLabel, Input, VStack, Text } from "@chakra-ui/react";


const Login = () => {
  const BACKEND_URL = 'http://localhost:3000';
  const [username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const [show, setshow] = useState(false);
  const[isUsernameEmpty, setUsernameEmpty] = useState(false);
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);
  const navigate = useNavigate()


  const handleView = () => setshow(!show);
  const handleLogin = event => {
    event.preventDefault();
    if(!username) setUsernameEmpty(true);
    if(!password) setPasswordEmpty(true);
    if(!isUsernameEmpty && !isPasswordEmpty){
 fetch(BACKEND_URL + '/signIn', {
  method:'POST',
  headers: {
    'Content-Type' : 'application/json',
  },
  body: JSON.stringify({username, password}),
 })

 .then(res => res.json())
 .then(data => {
  console.log(data);
  if(data.username){
    navigate('/')
  }
 })
 .catch(err => console.log('Login fetch /sigin: Error:', err));
    }
  };
  const handleSignUp = event => {
    event.preventDefault();
    navigate('/signup')
  };

  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center">
      <Box borderWidth={1} borderRadius="lg" p={8}>
        <VStack spacing={4}>
          <form onSubmit={handleLogin}>
            <FormControl id="username">
              <FormLabel fontSize="lg">Username</FormLabel>
              <Input fontSize="lg" type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel fontSize="lg">Password</FormLabel>
              <Input fontSize="lg" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </FormControl>
            <Button colorScheme="teal" type="submit" width="full">Log in</Button>
          </form>
          <Text fontSize="lg">Don't have an account?</Text>
          <Box borderBottom="1px solid" borderColor="gray.500">
            <Link to="/signup">Sign up</Link>
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
}

export default Login;