import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
// import { useParams } from 'react-router-dom'

const ResetPassword = () => {

    const [password,setPassword] = useState("")
    // const params = useParams();

  return <Container py={"16"} height={"90vh"}>

    <form>

        <Heading
          children="Reset Password "
          my="16"
          textTransform={"uppercase"}
          textAlign={["center","left"]}
        />

        <VStack spacing="8">
            <Input 
                required 
                value={password} 
                onChange={ e=> setPassword(e.target.value)}
                placeholder='New Password'
                type={'password'}
                focusBorderColor='blue.500'
            />
            
            <Button 
                type='submit'
                w={"full"} 
                colorScheme='blue'
            >
                Reset Password
            </Button>
        </VStack>
    </form>
  </Container>
}

export default ResetPassword