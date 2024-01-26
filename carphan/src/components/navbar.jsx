import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <Flex
        width={"100%"}
        height={"15vh"}
        py={2}
        paddingX={"120px"}
        alignItems={"center"}>
        <Link to={"/"}>
          <Text color={"#ffffff"} fontSize={30} fontWeight={600}>
            AIVIIO.
          </Text>
        </Link>
        <Flex width={"100%"} justifyContent={"flex-end"} gap={4}>
          {/* <Button rounded={14}>Create account</Button> */}
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
