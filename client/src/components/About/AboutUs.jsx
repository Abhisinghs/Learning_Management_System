import { Avatar, Box, Button, Center, Container, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import introVideo from '../../assets/videos/intro.mp4'
import { RiSecurePaymentFill } from 'react-icons/ri'

const  Founder = ()=>(
    <Stack
       direction={['column','row']}
       spacing={['4','16']}
       padding={'8'}
    >
      <VStack>
        <Avatar 
          boxSize={['40','48']}
         
         />
        <Text children="Co-Founder" opacity={0.7}/>
      </VStack>

      <VStack justifyContent={'center'} alignItems={['center','flex-start']}>
         <Heading children="Abhishek Singh" size={['md',"xl"]}/>
         <Text
           textAlign={['center','left']} 
           children={'Hi, I am a full-stack developer and a teacher. Our mission is to provide quality content at reasonable price. '}
        />

      </VStack>

    </Stack>
)

const VideoPlayer = ()=>(
    <Box>
        <video
            controls 
            controlsList="nodownload nofullscreen noremoteplayback" 
            disablePictureInPicture
            disableRemotePlayback
            src={introVideo}
            autoPlay
            muted
        ></video>
    </Box>
)

const TandC =()=>(
  <Box>
    <Heading 
      size={'md'} 
      children="Terms & Condition" 
      textAlign={['center','left']}
      my='4'
    />

    <Box h='sm' p='4'>
      <Text 
        fontFamily={'heading'}
        textAlign={['center','left']} 
        letterSpacing={'widest'}
      >
        {termsAndCondition}
      </Text>

      <Heading 
        my='4' 
        size={'xs'} 
        children="Refund only applicable for cancellation within 7 days."
      />
    </Box>
  </Box>
)
const AboutUs = () => {
  return (
    <Container 
      maxW={'container.lg'}
      padding="16"
      boxShadow={"lg"}
    >  
      <Heading
        children="About Us" 
        textAlign={['center','left']}
       />

       <Founder />

       <Stack m={'8'} direction={['column','row']} alignItems={"center"}>

         <Text fontFamily={'cursive'} m={'8'} textAlign={['center','left']}>
            We are a Video streaming platform with some premium courses abavilable
            only for premium users and you can also likes video.
         </Text>

         <Link to={'/subscribe'}>
            <Button variant={'ghost'} colorScheme='blue'>
                Checkout Our Best Plain
            </Button>
         </Link>
       </Stack>

       <VideoPlayer/>

        <TandC termsAndCondition={"termsAndCondition"}/>
       <HStack my={'4'} p={'4'}>
          <RiSecurePaymentFill/>
          <Heading 
            size={'xs'}
            fontFamily="sans-serif"
            textTransform={"uppercase"}
            children={"Payment is secured by Razorpay"}
          />
       </HStack>
    </Container>
  )
}

export default AboutUs