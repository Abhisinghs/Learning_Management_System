import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const PaymentFail = () => {
  return <Container h="90vh" p="16">
  <VStack justifyContent={'center'} h="full" spacing={'4'}>

  <RiErrorWarningFill size={'3rem'}/>
  <Heading size={'lg'} textTransform={'uppercase'} children="Payment Fail"/>
    <Link to='/subscribe'>
      <Button variant={'ghost'} color={'blue'} >Try Again</Button>
    </Link>
  </VStack>
</Container>
}

export default PaymentFail