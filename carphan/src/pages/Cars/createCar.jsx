import { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  FormControl,
  Select,
  FormLabel,
  Textarea,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/slices/authSLice";
import Sidebar from "../../components/sidebar";
import TopNav from "../../components/TopNav";
import { useCreateCarMutation } from "../../redux/api_Slices/carSlice";
import { useNavigate } from "react-router-dom";
const CreateCar = () => {
  const user = useSelector(currentUser);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const [createCar] = useCreateCarMutation();
  const navigate = useNavigate();
  const toast = useToast();
  const handleChange = (e) => {
    setPhoto(e.target.files ? e.target.files[0] : null);
  };
  const body = {
    photo,
    name,
    year,
    price,
    description,
    vehicleType,
    user: user && user.otherInfo && user.otherInfo._id,
  };

  const handleCreateCar = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(body)) {
        formData.append(key, value);
      }

      await createCar(formData).unwrap();
      navigate("/myvehicles");
      toast({
        title: `New car added successfully`,
        status: "success",
        position: "top",
        variant: "subtle",
        duration: 8000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error.data);
      toast({
        title: error.data,
        status: "error",
        position: "top",
        variant: "subtle",
        duration: 8000,
        isClosable: true,
      });
    }
  };
  return (
    <Box className='home1' width={"100%"} height={"fit-content"} bg={"#00111C"}>
      <Flex width={"100%"} height={"fit-content"} bg={"#00111C"}>
        <Sidebar />
        <Box width={"100%"} height={"100vh"} bg={"#00111C"} paddingY={4}>
          <TopNav />

          <Flex
            bg={"#00111C"}
            width={"100%"}
            height={"fit-content"}
            paddingY={4}
            paddingX={10}
            justifyContent={"center"}>
            <Box
              width={"55%"}
              marginTop={10}
              bg={"#001a2c"}
              rounded={16}
              padding={4}
              height={"fit-content"}
              boxShadow={" 0 4px 30px rgba(0, 0, 0, 0.1);"}
              border={"2px solid #ffffff"}
              backdropFilter={" blur(5px)"}>
              <Text
                color={"#ffffff"}
                fontSize={22}
                fontWeight={600}
                paddingBottom={4}
                textAlign={"center"}>
                Add Vehicle
              </Text>
              <form onSubmit={handleCreateCar}>
                <Flex gap={3} alignItems={"center"}>
                  <FormControl>
                    <FormLabel color={"#ffffff"}>Image</FormLabel>
                    <Input
                      type='file'
                      rounded={12}
                      color={"#ffffff"}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color={"#ffffff"}>Car Name</FormLabel>
                    <Input
                      type='text'
                      color={"#ffffff"}
                      rounded={12}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                </Flex>
                <Flex gap={3} alignItems={"center"}>
                  <FormControl>
                    <FormLabel color={"#ffffff"}>Year</FormLabel>
                    <Input
                      type='text'
                      color={"#ffffff"}
                      rounded={12}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color={"#ffffff"}>Price</FormLabel>
                    <Input
                      type='text'
                      color={"#ffffff"}
                      rounded={12}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </FormControl>
                </Flex>
                <FormControl>
                  <FormLabel color={"#ffffff"}>Vehicle Type</FormLabel>
                  <Select
                    placeholder='Select Type'
                    id='list'
                    color={"#ffffff"}
                    onChange={(e) => setVehicleType(e.target.value)}>
                    <option value='Sedan'>Sedan</option>
                    <option value='SUV'>SUV</option>
                    <option value='Convertable'>Convertable</option>
                    <option value='Automatic'>Automatic</option>,
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel color={"#ffffff"}>Description</FormLabel>
                  <Textarea
                    placeholder='Your Description.'
                    color={"#ffffff"}
                    onChange={(e) => setDescription(e.target.value)}
                    rounded={12}
                    bg={"#00283F"}
                    size='sm'
                  />
                </FormControl>
                <Button
                  width={"full"}
                  bg={"#00e995"}
                  color={"#001a2c"}
                  type='submit'
                  marginTop={3}
                  rounded={12}>
                  Add Vehicle
                </Button>
              </form>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default CreateCar;
