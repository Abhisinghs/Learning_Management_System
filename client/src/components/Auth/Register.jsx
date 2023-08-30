import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack, background, border, color } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export const fileUploadCss={
    cursor:'pointer', 
    marginLeft:'-5%',
    width:'110%',
    border:'none',
    height:'100%',
    color:'#10a6e1' ,
    backgroundColor:'white'
}
const fileUploadStyle = {
    '&::file-selector-button':fileUploadCss,
}

const Register = () => {

    const [name,setName] = useState("")
    const [email,setEmail]= useState("")
    const [password,setPassword] =useState()
    const [imagePrev,setImagePrev] = useState('')
    const [image,setImage] = useState('')

    const changeImageHandler = e =>{
        const file= e.target.files[0];
        const reader=new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend=()=>{
            setImagePrev(reader.result)
            setImage(file)
        }
    }

  return <Container h={'auto'}>

    <VStack h={'full'} justifyContent="center" spacing={"4"}>
        <Heading textTransform={'uppercase'} children={"Registration"}/>

        <form style={{width:'100%'}}>

           <Box my={'4'} display={'flex'} justifyContent={'center'}>
              <Avatar src={imagePrev} size={'2xl'}/>
           </Box>

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

           <Box my={'4'}>
            <FormLabel htmlFor='password' children="Password"/>
            <Input 
                required 
                id='password' 
                value={password} 
                onChange={ e=> setPassword(e.target.value)}
                placeholder='Enter Your Password '
                type={'password'}
                focusBorderColor='blue.500'
            />
           </Box>

           <Box my={'4'}>
            <FormLabel htmlFor='chooseAvatar' children="Choose Avatar"/>
            <Input 
            accept='image/*'
                required 
                id='chooseAvatar' 
                type={'file'}
                focusBorderColor='blue.500'
                css={fileUploadStyle}
                onChange={changeImageHandler}
            />
           </Box>


           <Button my='4' colorScheme={'blue'} type='submit'>
              Sign Up
           </Button>

           <Box>
                Already Signed Up?{' '}
                <Link to={'/login'}>
                    <Button colorScheme={'blue'} variant="link">
                    Login 
                    </Button>{" "}
                    here
                </Link>
           </Box>

        </form>
    </VStack>
  </Container>
}

export default Register