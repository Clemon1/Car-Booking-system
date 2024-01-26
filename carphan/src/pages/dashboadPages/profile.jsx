import {
  Box,
  Flex,
  Text,
  Avatar,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { CgNametag } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Sidebar from "../../components/sidebar";
import TopNav from "../../components/TopNav";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/slices/authSLice";
const Profile = () => {
  const user = useSelector(currentUser);
  return (
    <Box className='home1' width={"100%"} height={"fit-content"} bg={"#00111C"}>
      <Flex width={"100%"} height={"fit-content"} bg={"#00111C"}>
        <Sidebar />
        <Box width={"100%"} height={"100vh"} bg={"#00111C"} paddingY={4}>
          <TopNav />
          <Box paddingX={10} width={"full"}>
            <Text fontSize={20} fontWeight={500} color={"#ffffff"}>
              Profile
            </Text>
          </Box>

          <Flex
            bg={"#00111C"}
            width={"100%"}
            justifyContent={"center"}
            height={"150vh"}
            paddingX={10}>
            <Box
              width={"50%"}
              height={"45vh"}
              bg={"#00283F"}
              rounded={12}
              padding={3}>
              <Flex
                width={"full"}
                height={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
                mb={2}>
                <Avatar
                  size='2xl'
                  name={`${user && user.otherInfo.firstName} ${
                    user && user.otherInfo.lastName
                  }`}
                />

                <Flex width={"full"} justifyContent={"center"}>
                  <List spacing={3} fontSize={19}>
                    <ListItem color={"#ffffff"}>
                      <ListIcon
                        as={CgNametag}
                        fontSize={24}
                        color='green.500'
                      />
                      {user && user.otherInfo.firstName} {""}
                      {user && user.otherInfo.lastName}
                    </ListItem>
                    <ListItem color={"#ffffff"}>
                      <ListIcon as={MdEmail} fontSize={24} color='green.500' />
                      {user && user.otherInfo.email}
                    </ListItem>
                    <ListItem color={"#ffffff"}>
                      <ListIcon
                        as={FaLocationDot}
                        fontSize={24}
                        color='green.500'
                      />
                      {user && user.otherInfo.location}
                    </ListItem>
                  </List>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
