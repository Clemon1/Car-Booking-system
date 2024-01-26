import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import car3 from "../assets/Image/car6.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box
      width={"100%"}
      height={"fit-content"}
      bg={
        "linear-gradient(137deg, hsla(204, 100%, 5%, 1) 77%, hsla(158, 100%, 46%, 1) 100%);"
      }>
      <Navbar />
      <Flex
        width={"100%"}
        height={"100vh"}
        bg={
          "linear-gradient(137deg, hsla(204, 100%, 5%, 1) 77%, hsla(158, 100%, 46%, 1) 100%);"
        }
        alignItems={"center"}
        paddingX={100}>
        <Flex
          width={"100%"}
          height={"100vh"}
          paddingTop={"107px"}
          flexDirection={"column"}
          alignItems={"flex-start"}>
          <Text fontSize={50} fontWeight={800} color={"#ffffff"}>
            <span className='hometext'>Unleashing </span>thrills
            <br />
            of Cars Worldwide
          </Text>
          <Link to={"/register"}>
            <Button
              bg={"#00e995"}
              color={"#001a2c"}
              rounded={12}
              fontWeight={700}
              p={6}>
              Get Started
            </Button>
          </Link>
        </Flex>
        <Flex
          width={"100%"}
          height={"100vh"}
          justifyItems={"flex-start"}
          alignItems={"center"}>
          <Image
            width={"90%"}
            height={"100vh"}
            src={car3}
            position={"relative"}
            top={"-80px"}
            objectFit={"cover"}
          />
        </Flex>
      </Flex>
      <Flex
        width={"100%"}
        height={"100vh"}
        bg={
          "linear-gradient(44deg, hsla(204, 100%, 5%, 1) 77%, hsla(158, 100%, 46%, 1) 100%)"
        }></Flex>
    </Box>
  );
};

export default Home;
