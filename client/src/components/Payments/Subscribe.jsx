import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Subscribe = () => {
  return <Container h='90vh' p='10'>
    <Heading
      children='Welcome' 
      my="8"
      textAlign={'center'}
    />

    <VStack
      boxShadow={'lg'}
      alignItems="stretch"
      borderRadius={'lg'}
      spacing="0"

    >

      <Box bg='blue.400'  p={'4'} css={{borderRadius:'8px 8px 0 0'}}>
        <Text color={'black'}  children={`Pro Pack - $50`}/>
      </Box>

      <Box p='4'>
        <VStack textAlign={'center'} px="8" mt={'4'} spacing="8">
          <Text 
            children={'Join pro pack and get access to all content.'}
          />

          <Heading size="md" children={'$50 only'}/>
        </VStack>

        <Button my="8" w="full" colorScheme={'blue'}>
          Buy Now
        </Button>
      </Box>

      <Box 
        bg={'blackAlpha.600'}
        p="4"
        css={{borderRadius:'0 0 8px 8px'}}
      >
        <Heading  
          color={'white'}
          textTransform='uppercase'
          size='sm'
          children={'100% refund at cancellation'}
        />

        <Text fontSize={'xs'} color="white" children="Terms & Conditions Apply"/>
      </Box>
    </VStack>
  </Container>
}

export default Subscribe