import { Flex, Button } from "@chakra-ui/react";
import Lottie from "lottie-react";
import lotError from "../assets/error404.json";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <Flex
      width={"100%"}
      height={"100vh"}
      flexDirection={"column"}
      alignItems={"center"}
      bg={"#00283F"}>
      <Lottie animationData={lotError} />
      <Link to={"/"}>
        <Button bg={"#00e995"} padding={4} color={"#001a2c"} rounded={12}>
          Return home
        </Button>
      </Link>
    </Flex>
  );
};

export default ErrorPage;
