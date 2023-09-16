import { Container, Grid, Heading, Input, Select, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import cursor from '../../../assets/images/cursor.png'
import Sidebar from '../Sidebar'
import { CategoryScale } from 'chart.js'

const CreateCourse = () => {

  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [createdBy,setCreatedBy]=useState("");
  const [category,setCategory]=useState("");
  const [image,setImage]=useState("");
  const [imagePrev,setImagePrev]=useState("");

  const categories =[
    "Web development",
    "Artificial Intellegence",
    "Data Structure & Algorithm",
    "App Developemt",
    "Data Science",
    "Game Development"
  ];

  return <Grid
    css={{
        cursor:`url(${cursor}),default`,
    }}
    minH={'100vh'}
    templateColumns={['1fr','5fr 1fr']}
  >
   
   <Container py='16' >
     <Heading  children='Create Course' textTransform={'uppercase'}  />
     <form>
      <Heading 
        textTransform={'uppercase'} 
        my='16'
        textAlign={['center','left']}
      />

      <VStack
        m="auto"
        spacing={'8'}
      >
      <Input
        value={title}
        onChange={e=>setTitle(e.target.value)}
        placeholder='Title'
        type={'text'}
        focusBorderColor='purple.300'
      />
      <Input
        value={description}
        onChange={e=>setDescription(e.target.value)}
        placeholder='Description'
        type={'text'}
        focusBorderColor='purple.300'
      />
      <Input
        value={createdBy}
        onChange={e=>setCreatedBy(e.target.value)}
        placeholder='Creator Name'
        type={'text'}
        focusBorderColor='purple.300'
      />
      
      <Select focusBorderColor="purple.300" value={category} onChange={e=>setCategory(e.target.value)} >
        
        <option value="">Category</option>
        {categories.map(item=>(
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>

      <Input 
        accept='image/*'
        required 
        id='chooseAvatar' 
        type={'file'}
        focusBorderColor='purple.500'
        css={fileUploadStyle}
        onChange={changeImageHandler}
      />

      </VStack>
     </form>
   </Container>
  <Sidebar/>
  </Grid>
}


export default CreateCourse