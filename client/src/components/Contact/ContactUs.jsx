import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ContactUs = () => {

  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [message,setMessage]=useState("")
  return (
    <Container h='85vh'>
        
      <VStack h='full' justifyContent={'center'} spacing="12">
        <Heading children="Contact Us"/>

        <form style={{width:'100%'}}>
          <Box>
            <FormLabel htmlFor='name' children={"Name"}/>
            <Input 
                required 
                id='name' 
                value={name} 
                onChange={ e=> setName(e.target.value)}
                placeholder='abc'
                type={'text'}
                focusBorderColor='blue.500'
            />
          </Box>

          <Box>
            <FormLabel htmlFor='email' children={"Email Address"}/>
            <Input 
                required 
                id='email' 
                value={email} 
                onChange={ e=> setEmail(e.target.value)}
                placeholder='abc@gmail.com'
                type={'email'}
                focusBorderColor='blue.500'
            />
          </Box>

          
          <Box>
            <FormLabel htmlFor='message' children={"Message"}/>
              <Textarea
                required 
                id='message' 
                value={message} 
                onChange={ e=> setMessage(e.target.value)}
                placeholder='Your Message....'
                type='text'
                
                focusBorderColor='blue.500'
              />
          </Box>

          <Button my='4' colorScheme={'blue'} type='submit'>
              Send Mail
          </Button>

          <Box>
                Request for a course?{' '}
                <Link to={'/request'}>
                    <Button colorScheme={'blue'} variant="link">
                    Click 
                    </Button>{" "}
                    here
                </Link>
           </Box>

        </form>
      </VStack>
    </Container>
  )
}

export default ContactUs