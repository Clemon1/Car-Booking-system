import { Flex, Spinner } from "@chakra-ui/react";
const Loader = () => {
  return (
    <Flex
      width={"100%"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      bg={"#00283F"}>
      <Spinner size={"xl"} thickness='4px' color={"#00e995"} />
    </Flex>
  );
};

export default Loader;
