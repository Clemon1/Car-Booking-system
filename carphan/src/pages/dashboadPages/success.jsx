import { Flex, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Success = () => {
  return (
    <Flex
      width={"100%"}
      height={"100vh"}
      bg={"#00111C"}
      direction={"column"}
      alignItems={"center"}>
      <Text fontSize={20} fontWeight={"500"} color={"#ffffff"}>
        Payment Successful
      </Text>
      <Link to={"/my-bookings"}>
        <Button>Back to home</Button>
      </Link>
    </Flex>
  );
};

export default Success;
