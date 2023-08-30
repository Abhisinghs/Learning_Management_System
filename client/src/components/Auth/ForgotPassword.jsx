import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const ForgotPassword = () => {

    const [email,setEmail] = useState("")
  return <Container py={"16"} height={"90vh"}>

    <form>

        <Heading
          children="Forgot Password "
          my="16"
          textTransform={"uppercase"}
          textAlign={["center","left"]}
        />

        <VStack spacing="8">
            <Input 
                required 
                id='email' 
                value={email} 
                onChange={ e=> setEmail(e.target.value)}
                placeholder='abc@gmail.com'
                type={'email'}
                focusBorderColor='blue.500'
            />
            
            <Button 
                type='submit'
                w={"full"} 
                colorScheme='blue'
            >
                Send Reset Link
            </Button>
        </VStack>
    </form>
  </Container>
}

export default ForgotPassword