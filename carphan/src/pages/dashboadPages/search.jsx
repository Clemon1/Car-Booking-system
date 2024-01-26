import { Box, Flex, Text } from "@chakra-ui/react";
import Sidebar from "../../components/sidebar";
import TopNav from "../../components/TopNav";
const Search = () => {
  return (
    <Box className='home1' width={"100%"} height={"fit-content"} bg={"#00111C"}>
      <Flex width={"100%"} height={"fit-content"} bg={"#00111C"}>
        <Sidebar />
        <Box width={"100%"} height={"100vh"} bg={"#00111C"} paddingY={4}>
          <TopNav />
          <Box paddingX={10} width={"full"}>
            <Text fontSize={20} fontWeight={500} color={"#ffffff"}>
              My Bookings
            </Text>
          </Box>

          <Flex
            bg={"#00111C"}
            width={"100%"}
            height={"150vh"}
            paddingX={10}></Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Search;
