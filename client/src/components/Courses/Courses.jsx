import { 
    Button, 
    Container, 
    HStack, 
    Heading, 
    Image, 
    Input, 
    Stack, 
    Text, 
    VStack
} from '@chakra-ui/react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Course=({views,title,imageSrc,id,addToPlayListHandler,creator,description,lectureCount}) =>{
    return (
        <VStack className='course' alignItems={['center','flex-start']}>
            <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
            <Heading
              textAlign={['center','left']}
              maxW="200px"
              size={'sm'}
              fontFamily={'sans-serif'}
              noOfLines={3}
              children={title}
            />
            <Text noOfLines={2} children={description}/>

            <HStack>
                <Text 
                   fontWeight={'bold'}
                   textTransform="uppercase"
                   children={'Creator'}
                />

                <Text
                    fontWeight={'bold'}
                   textTransform="uppercase"
                   children={creator}
                />
            </HStack>

            <Heading 
                textAlign={'center'} 
                size='xs' 
                children={`Lecture - ${lectureCount}`}
                textTransform="uppercase"
            />

            <Heading 
                size='xs' 
                children={`Views - ${views}`}
                textTransform="uppercase"
            />

            <Stack direction={['column','row']} alignItems="center">
               <Link to={`/course/${id}`}>
                   <Button colorScheme={'blue'}>Watch Now</Button>
               </Link>

               <Button
                  variant={'ghost'}
                  colorScheme={'blue'}
                  onClick={()=>{addToPlayListHandler(id)}}
                >
                  Add to Playlist
                </Button>
            </Stack>
            
        </VStack>
    )
}

function Courses() {

    //add to playlist function
     const addToPlayListHandler = ()=>{
        console.log("Added to playlist");
     }

    const [keyword,setKeyword] = useState("")
    const [category,setCategory]=useState("")
    const categories =[
        "Web development",
        "Artificial Intellegence",
        "Data Structure & Algorithm",
        "App Developemt",
        "Data Science",
        "Game Development"
    ]
  return (
    <Container minH={"95vh"} maxW={"container.lg"} paddingY={"8"}>

        <Heading children="All Courses" m={'8'}/>

        <Input 
            value={keyword} 
            onChange={e => setKeyword(e.target.value)}
            placeholder='Search a course...' 
            type={'text'}
            focusBorderColor='blue.500'

        />

        <HStack
         overflowX={'auto'} 
         paddingY="8" 
         css={{
            '&::-webkit-scrollbar': {
            display:'none',
            },
         }}>
           
           {
            categories.map((item,index)=>(
                <Button  
                  key={index} 
                  onClick={()=> setCategory(item)} 
                  minW={'60'}>

                <Text children={item}/>

            </Button>
            ))
           }
        </HStack>

        <Stack
           direction={['column','row']}
           flexWrap="wrap"
           justifyContent={['flex-start','space-evenly']}
           alignItems={['center','flex-start']}
        >

            <Course 
                title={'sample'}
                description={'sample'}
                views={23}
                imageSrc={"https://cdn.pixabay.com/photo/2017/02/07/16/47/kingfisher-2046453_640.jpg"}
                id={'sample'}
                creator={"sample boy"}
                lectureCount={2}
                addToPlayListHandler={addToPlayListHandler}
            />
        </Stack>

    </Container>
  )
}

export default Courses;