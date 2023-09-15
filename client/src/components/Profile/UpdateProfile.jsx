import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const UpdateProfile = () => {

  const [oldPassword,setOldPassword] = useState("");
  const [newPassword,setNewPassword] = useState("");
  return <Container py='16' minH={'90vh'}>
    <form>
      <Heading
        textTransform={'uppercase'}
        children="Update Profile"
        my="16"
        textAlign={['center','left']}
      />

      <VStack>
        <Input 
          required 
          value={name} 
          onChange={ e=> setName(e.target.value)}
          placeholder='Name '
          type={'text'}
          focusBorderColor='blue.500'
        />
        
        <Input 
          required 
          value={email} 
          onChange={ e=> setEmail(e.target.value)}
          placeholder='Email'
          type={'email'}
          focusBorderColor='blue.500'
        />

        <Button w='full' colorScheme={'blue'} type='submit'>Change</Button>
      </VStack>
    </form>
  </Container>
}

export default UpdateProfile;