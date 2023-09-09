import { Avatar, Button, Container, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {

    const user= {
        name:"Abhishek",
        email:"abc@gmail.com",
        createdAt:String(new Date().toISOString()),
        role:"admin",
        subscription:{
            status:"active",
        },
        playlist:[
            {
                course:'ahdfkdf',
                poster:'sdhfkdjfk'
            }
        ]
    }
  return <Container minH={'95vh'} maxW="container.lg" py="8">
    <Heading
        children="Profile"
        m="8"
        textTransform={'uppercase'}
    />

    <Stack
      justifyContent={"flex-start"}
      direction={['column','row']}
      alignItems={'center'}
      spacing={['8','16']}
      padding="8"
    >

    <VStack>
        <Avatar boxSizing={'48'}/>
        <Button colorScheme={'blue'} variant={'ghost'}>
            Change Photo
        </Button>
    </VStack>

    <VStack spacing={'4'} alignItems={['center','flex-start']}>
       <HStack>
           <Text children="Name" fontWeight={'bold'} />
           <Text children={user.name} />
       </HStack>{' '}
       <HStack>
           <Text children="Email" fontWeight={'bold'} />
           <Text children={user.email} />
       </HStack>{' '}
       <HStack>
           <Text children="CreatedAt" fontWeight={'bold'} />
           <Text children={user.createdAt.split('T')[0]} />
       </HStack>{' '}
        {
            user.role ==='admin' && (
                <HStack>
                    <Text children="Subscription" fontWeight={'bold'} />
                    {
                        user.subscription.status === "active" ? (
                            <Button color={'blue.500'} variant='unstyled'>Cancel Subcription</Button>
                        ) : (
                            <Link to='/subscribe'>
                                <Button colorScheme={'blue'}>Subscribe</Button>
                            </Link>
                        )
                    }
                </HStack>
            )
        }
        <Stack direction={['column','row']} alignItems={'center'}>
            <Link to='/updateprofile'>
                <Button>Update Profile</Button>
            </Link>

            <Link to='/changepassword'>
                <Button>Change Password</Button>
            </Link>
        </Stack>
    </VStack>
    </Stack>

    <Heading children='Playlist' size={'md'} my='8' />
  </Container>
}

export default Profile