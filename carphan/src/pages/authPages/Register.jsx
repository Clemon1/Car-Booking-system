import { useState } from "react";
import {
  Flex,
  Box,
  Text,
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../redux/api_Slices/authSLice";
import { isSuccessful } from "../../redux/slices/authSLice";
import { ukList } from "../../components/ukList";
const Register = () => {
  const dispatch = useDispatch();
  const [register] = useRegisterMutation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const body = {
    firstName,
    lastName,
    email,
    password,
    location,
  };
  const navigate = useNavigate();
  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      dispatch(isSuccessful(await register(body).unwrap()));
      navigate("/dashboard");
      toast({
        title: `Account created`,
        status: "success",
        position: "top",
        variant: "subtle",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: error.data,
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex
      width={"100%"}
      height={"100vh"}
      flexDirection={"column"}
      alignItems={"center"}
      bg={
        "linear-gradient(137deg, hsla(204, 100%, 5%, 1) 77%, hsla(158, 100%, 46%, 1) 100%);"
      }>
      <Navbar />
      <Box
        width={"33%"}
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
          Register
        </Text>
        <form onSubmit={handleRegistration}>
          <Flex width={"full"} justifyContent={"space-between"} gap={4}>
            <FormControl>
              <FormLabel color={"#ffffff"}>First Name</FormLabel>
              <Input
                color={"#ffffff"}
                type='text'
                rounded={12}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel color={"#ffffff"}>Last Name</FormLabel>
              <Input
                color={"#ffffff"}
                type='text'
                rounded={12}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>
          </Flex>
          <FormControl>
            <FormLabel color={"#ffffff"}>Location</FormLabel>
            <Select
              rounded={12}
              bg={"#001a2c"}
              id='list'
              placeholder='Select location'
              color={"#ffffff"}
              onChange={(e) => setLocation(e.target.value)}>
              {ukList.map((list, key) => (
                <option color='#000000 !important' key={key} value={list}>
                  {list}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel color={"#ffffff"}>Email address</FormLabel>
            <Input
              color={"#ffffff"}
              type='email'
              rounded={12}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl marginTop={2}>
            <FormLabel color={"#ffffff"}>Password</FormLabel>
            <Input
              color={"#ffffff"}
              type='password'
              rounded={12}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            width={"full"}
            type='submit'
            bg={"#00e995"}
            color={"#001a2c"}
            marginTop={3}
            rounded={12}>
            Register
          </Button>
          <Text
            textAlign={"center"}
            fontSize={15}
            fontWeight={500}
            color={"#ffffff"}
            marginTop={2}>
            Have an account?
            <Link to={"/login"}>
              <Text fontWeight={600}>Login</Text>
            </Link>
          </Text>
        </form>
      </Box>
    </Flex>
  );
};

export default Register;
