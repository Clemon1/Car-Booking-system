import { Box, FormControl, FormLabel, Select, Button } from "@chakra-ui/react";
const BookForm = () => {
  return (
    <Box
      width={"50%"}
      height={"fit-content"}
      rounded={12}
      p={4}
      bg={"#00111c"}
      border={"2px #D1F5FF solid"}
      blur={"16px"}
      saturate={"180%"}>
      <form>
        <FormControl>
          <FormLabel color={"#D1F5FF"}>Body Style</FormLabel>
          <Select
            bg={"#00111c"}
            color={"#D1F5FF"}
            fontWeight={500}
            placeholder='Select option'
            rounded={12}>
            <option color='#000000' value='option1'>
              Convertable
            </option>
            <option value='option2'>SUV</option>
            <option value='option3'>Option 3</option>
          </Select>
        </FormControl>
        <FormControl marginTop={2}>
          <Button width={"full"} rounded={12}>
            Search
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default BookForm;
