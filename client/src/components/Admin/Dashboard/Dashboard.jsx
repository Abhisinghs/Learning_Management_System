import { Box, Grid, HStack, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import cursor from '../../../assets/images/cursor.png'
import Sidebar from '../Sidebar'
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri'


const Databox =({title,qty,qtyPercentage,profit})=>(
    <Box
      w={['full','20%']}
      boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
      p='8'
      borderRadius={'lg'}
    >
      <Text children={title}/>

      <HStack spacing={'6'}>
        
        <Text fontSize={'2xl'} fontWeight="bold" children={qty} />

        <HStack>
          <Text children={`${qtyPercentage}%`} />
          {profit ? (
            <RiArrowUpLine color='green'/>
          ):(
            <RiArrowDownLine color='red'/>
          )}
        </HStack>
      </HStack>
       <Text  opacity={0.6} children="Since Last Month"/>
    </Box>
)
const Dashboard = () => {
  return <Grid
    css={{
        cursor:`url(${cursor}),default`,
    }}
    minH={'100vh'}
    templateColumns={['1fr','5fr 1fr']}
  >
    <Box boxSizing='border-box' py='16' px={['4','0']}>
      <Text
        textAlign={'center'}
        opacity={0.5}
        children={`Last change was on ${String(new Date()).split('G')[0]}`}
      />

      <Heading 
        children='Dashboard'
        ml={['0','16']}
        mb='16'
        textAlign={['center','left']}
      />

      <Stack
        direction={['column','row']}
        minH={'24'}
        justifyContent={'space-evenly'}
      >
        <Databox  title="Views" qty={123} qtyPercentage={30} profit={true} />
        <Databox  title="Users" qty={23} qtyPercentage={78} profit={true} />
        <Databox  title="Subscription" qty={12} qtyPercentage={20} profit={false} />
      </Stack>

      <Box
        m={['0','16']}
        borderRadius="lg"
        p={['0','16']}
        mt={['4','16']}
        boxShadow={'-2px 0 10px rgba(107,70,193,0.5'}
      >

      </Box>
    </Box>

    <Sidebar/>
  </Grid>
}

export default Dashboard