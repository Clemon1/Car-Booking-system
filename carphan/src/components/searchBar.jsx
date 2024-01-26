import { Flex, Input, Button, Icon } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
const SearchBar = () => {
  return (
    <Flex
      width={"60%"}
      height={"100%"}
      rounded={20}
      alignItems={"center"}
      padding={0}>
      <Input
        width={"full"}
        color={"#ffffff"}
        _focusVisible={"none"}
        fontWeight={500}
        border={"2px #ffffff solid"}
        roundedLeft={20}
        roundedRight={0}
      />
      <Button
        bg={"#00e995"}
        position={"relative"}
        top={0}
        bottom={0}
        left={0}
        color={"#001a2c"}
        roundedLeft={0}
        roundedRight={20}>
        <Icon fontSize={22} as={IoSearch} />
      </Button>
    </Flex>
  );
};

export default SearchBar;
