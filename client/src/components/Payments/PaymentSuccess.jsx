import { Box, Container, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiCheckboxCircleFill } from 'react-icons/ri'

const PaymentSuccess = () => {
  return <Container h="90vh" p="16">
    <Heading my="8" textAlign={'center'} children="You have Pro Pack"/>
    <VStack
      boxShadow={'lg'}
      pb="16"
      alignItems={'center'}
      borderRadius="lg"
    >
      <Box 
        w='full'
        bg="blue.400"
        p="4"
        css={{borderRadius:'8px 8px 0 0'}}
      >
        <Text
          children="Payment Success"
        />
      </Box> 

      <Box p="4">
        <VStack
          textAlign={'center'}
          px="8"
          mt="4"
          spacing={'8'}
        >
        <Text 
          children="Congratulation you're a pro member.
          You have access to premium content"
        />

        <Heading size={'4xl'}>
          <RiCheckboxCircleFill/>
        </Heading>
        </VStack>
      </Box>
    </VStack>
  </Container>
}

export default PaymentSuccess