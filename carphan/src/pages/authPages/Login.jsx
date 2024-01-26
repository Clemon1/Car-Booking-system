import { useState } from "react";
import {
  Flex,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import { isSuccessful } from "../../redux/slices/authSLice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api_Slices/authSLice";
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const toast = useToast();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = dispatch(
        isSuccessful(await login({ email, password }).unwrap()),
      );
      navigate("/dashboard");
      toast({
        title: `Welcome back ${res.payload.otherInfo.firstName}`,
        description: "We have amazing cars just for you.",
        status: "success",
        position: "top",
        variant: "subtle",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error.data);
      toast({
        title: error.data,
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      console.log(error.status);
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
          login
        </Text>
        <form onSubmit={handleLogin}>
          <FormControl>
            <FormLabel color={"#ffffff"}>Email address</FormLabel>
            <Input
              type='email'
              color={"#ffffff"}
              rounded={12}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl marginTop={2}>
            <FormLabel color={"#ffffff"}>Password</FormLabel>
            <Input
              type='password'
              color={"#ffffff"}
              rounded={12}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            width={"full"}
            bg={"#00e995"}
            color={"#001a2c"}
            type='submit'
            marginTop={3}
            rounded={12}>
            Login
          </Button>
          <Text
            textAlign={"center"}
            fontSize={15}
            fontWeight={500}
            color={"#ffffff"}
            marginTop={2}>
            Don&apos;t have an account?
            <Link to={"/register"}>
              <Text fontWeight={600}>Register</Text>
            </Link>
          </Text>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
