import { Box, Grid, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import introVideo from '../../assets/videos/intro.mp4'

const CoursePage = () => {

  const LectureTitle="LectureTitle";
  const lectureNumber=0;
  return <Grid
    minH={"90vh"}
    templateColumns={['1fr','3fr 1fr']}
  >
   
   <Box>
        <video
            controls 
            width={'80%'}
            controlsList="nodownload  noremoteplayback" 
            disablePictureInPicture
            disableRemotePlayback
            src={introVideo}
        ></video>

        <Heading m='2' size={'lg'} children={`#${lectureNumber+1} ${LectureTitle}`}/>
        <Heading  m='2' size={'lg'} children="Description"/>
        <Text m='4'  children={'djfkdfdkfjdkfjdkjk'} />
   </Box>
  </Grid>
}

export default CoursePage