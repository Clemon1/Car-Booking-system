import {
  Box,
  Flex,
  Text,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Avatar,
  Textarea,
  Button,
  Icon,
  FormControl,
  Input,
  useToast,
  UnorderedList,
  List,
  ListItem,
  ListIcon,
  Stack,
  Radio,
  RadioGroup,
  FormLabel,
} from "@chakra-ui/react";
import { IoIosSend } from "react-icons/io";
import Sidebar from "../../components/sidebar";
import TopNav from "../../components/TopNav";
import { useParams } from "react-router-dom";
import { useSingleCarsQuery } from "../../redux/api_Slices/carSlice";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/slices/authSLice";
import { useState } from "react";
import { CgNametag } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useCreateBookingMutation } from "../../redux/api_Slices/bookingSlice";
import dayjs from "dayjs";
import { FaStar } from "react-icons/fa";
import Analytics from "../../components/Analytics";
import { loadStripe } from "@stripe/stripe-js";

const SingleCar = () => {
  const { id } = useParams();
  const { data = {} } = useSingleCarsQuery(id);

  console.log(data);
  const user = useSelector(currentUser);
  const [dateFrom, setFromDate] = useState("");
  const [dateTo, setToDate] = useState("");
  const [createBooking] = useCreateBookingMutation();
  const carOwner = data && data.user && data.user._id;
  const loginUser = user && user.otherInfo && user.otherInfo._id;
  const toast = useToast();
  //RTK QUERY MUTATION
  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const session = await createBooking({
        userId: user.otherInfo._id,
        carId: id,
        carName: data.name,
        price: dayjs(dateTo).diff(dateFrom, "days") * data.price,
        email: user.otherInfo.email,
        fullName: `${user.otherInfo.firstName} ${user.otherInfo.lastName}`,
        location: user.otherInfo.location,
        dateFrom,
        dateTo,
      }).unwrap();
      const stripe = await loadStripe(
        "pk_test_51LpSASIImBvGXRhvz0emkDBuTF6wHKW0OqU6r59Lk1Au9MokGubisujdZMbIi8yE5QYy5ERGqa8eYcQoq5mjHj9s00tZO9oD17",
      );
      stripe.redirectToCheckout({
        sessionId: session,
      });
      // window.location.href = pay.url;

      toast({
        title: `${data.name} has been booked successfully`,
        status: "success",
        position: "top",
        variant: "left-accent",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error.data);
      toast({
        title: `${error.data}`,
        status: "error",
        position: "top",
        duration: 9000,
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
          <Box paddingX={10} paddingY={2} mb={5} width={"full"} height={"8vh"}>
            <Text fontSize={22} fontWeight={500} color={"#ffffff"}>
              {data.name} -- £{data.price}/day
            </Text>
          </Box>

          <Flex
            bg={"#00111C"}
            width={"100%"}
            gap={2}
            flexDirection={["column", "column", "column", "row", "row"]}
            height={"fit-content"}
            paddingX={[4, 4, 8, 10, 10]}
            justifyContent={"center"}>
            <Flex
              width={["100%", "100%", "100%", "100%", "50%"]}
              flexDirection={"column"}
              gap={2}>
              <Image
                width={"full"}
                height={"45vh"}
                src={`http://localhost:4000/${data.image}`}
                rounded={12}
                alt={data.image}
                objectFit={"cover"}
              />
              <Accordion width={"full"} defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton bg={"#00283F"} color={"#ffffff"}>
                      <Box
                        as='span'
                        color={"#ffffff"}
                        fontSize={17}
                        fontWeight={500}
                        flex='1'
                        textAlign='left'>
                        Description
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} color={"#ffffff"}>
                    {data.description}
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton bg={"#00283F"} color={"#ffffff"}>
                      <Box
                        as='span'
                        color={"#ffffff"}
                        fontSize={17}
                        fontWeight={500}
                        flex='1'
                        textAlign='left'>
                        Car Owner
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} color={"#ffffff"}>
                    <Flex
                      width={"full"}
                      direction={"column"}
                      alignItems={"center"}>
                      {data && data.user && (
                        <Avatar
                          size={"xl"}
                          name={`${data.user.firstName} ${data.user.lastName}`}
                        />
                      )}
                      <Flex width={"full"} justifyContent={"center"}>
                        {data && data.user && (
                          <List spacing={3} fontSize={19}>
                            <ListItem color={"#ffffff"}>
                              <ListIcon
                                as={CgNametag}
                                fontSize={24}
                                color='green.500'
                              />
                              {data && data.user.firstName} {""}
                              {data && data.user.lastName}
                            </ListItem>
                            <ListItem color={"#ffffff"}>
                              <ListIcon
                                as={MdEmail}
                                fontSize={24}
                                color='green.500'
                              />
                              {data.user.email}
                            </ListItem>
                            <ListItem color={"#ffffff"}>
                              <ListIcon
                                as={FaLocationDot}
                                fontSize={24}
                                color='green.500'
                              />
                              {data.user.location}
                            </ListItem>
                          </List>
                        )}
                      </Flex>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <Flex
                width={"full"}
                flexDirection={"column"}
                gap={4}
                paddingX={4}>
                <form>
                  <Text
                    as='span'
                    color={"#ffffff"}
                    fontSize={17}
                    fontWeight={500}
                    flex='1'
                    textAlign='left'>
                    #Comments
                  </Text>
                  <RadioGroup>
                    <Stack
                      direction='row'
                      color={"#ffffff"}
                      fontSize={18}
                      fontWeight={500}>
                      <Radio value='5' colorScheme='green'>
                        5 <Icon as={FaStar} color={"yellow"} fontSize={20} />
                      </Radio>
                      <Radio value='4' colorScheme='green'>
                        4 <Icon as={FaStar} color={"yellow"} fontSize={20} />
                      </Radio>
                      <Radio value='3' colorScheme='green'>
                        3 <Icon as={FaStar} color={"yellow"} fontSize={20} />
                      </Radio>
                      <Radio value='2' colorScheme='green'>
                        2 <Icon as={FaStar} color={"yellow"} fontSize={20} />
                      </Radio>
                      <Radio value='1' colorScheme='green'>
                        1 <Icon as={FaStar} color={"yellow"} fontSize={20} />
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <Flex width={"full"} alignItems={"center"} gap={2}>
                    <Avatar
                      name={`${user && user.otherInfo.firstName} ${
                        user && user.otherInfo.lastName
                      }`}
                      src=''
                    />
                    <Textarea
                      placeholder='Your comment...'
                      color={"#ffffff"}
                      rounded={12}
                      bg={"#00283F"}
                      size='sm'
                    />
                    <Button
                      bg={"#00e995"}
                      color={"#001a2c"}
                      type='submit'
                      rounded={16}>
                      <Icon as={IoIosSend} fontSize={25} />
                    </Button>
                  </Flex>
                </form>
              </Flex>
            </Flex>
            <Flex
              width={["100%", "100%", "100%", "100%", "50%"]}
              justifyContent={"center"}
              position={"relative"}>
              {loginUser === carOwner ? (
                <Box
                  width={"90%"}
                  bg={"#00283F"}
                  rounded={12}
                  transition={".3s ease-in-out all"}
                  height={"100vh"}
                  position={"relative"}>
                  <Analytics price={data && data.currentBookings} />
                  <Accordion width={"full"} defaultIndex={[0]} allowMultiple>
                    <AccordionItem>
                      <h2>
                        <AccordionButton bg={"#00283F"} color={"#ffffff"}>
                          <Box
                            as='span'
                            color={"#ffffff"}
                            fontSize={17}
                            fontWeight={500}
                            flex='1'
                            textAlign='left'>
                            Booking history
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4} color={"#ffffff"}>
                        {data &&
                        data.currentBookings &&
                        data.currentBookings.length > 0 ? (
                          data.currentBookings.map((e, key) => (
                            <Flex
                              key={key}
                              width={"full"}
                              padding={2}
                              justifyContent={"space-between"}>
                              <Box>{e.email}</Box>
                              <Box>${e.price}</Box>
                              <Box>
                                {dayjs(e.dateTo).diff(e.dateFrom, "days")} days
                              </Box>
                            </Flex>
                          ))
                        ) : (
                          <p>No bookings available</p>
                        )}
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Box>
              ) : (
                <Box
                  width={"35%"}
                  bg={"#00283F"}
                  transition={".3s ease-in-out all"}
                  height={"fit-content"}
                  position={"fixed"}
                  p={6}
                  rounded={12}>
                  <form onSubmit={handleBooking}>
                    <Flex
                      width={"full"}
                      justifyContent={"space-between"}
                      gap={2}>
                      <FormControl>
                        <FormLabel color={"#ffffff"} fontSize={18}>
                          From
                        </FormLabel>
                        <Input
                          onChange={(e) => setFromDate(e.target.value)}
                          color={"#ffffff"}
                          rounded={12}
                          fontWeight={500}
                          type='date'
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel color={"#ffffff"} fontSize={18}>
                          To
                        </FormLabel>
                        <Input
                          onChange={(e) => setToDate(e.target.value)}
                          color={"#ffffff"}
                          rounded={12}
                          fontWeight={500}
                          type='date'
                        />
                      </FormControl>
                    </Flex>

                    <Button
                      width={"full"}
                      bg={"#00e995"}
                      isDisabled={loginUser === carOwner}
                      rounded={12}
                      mt={4}
                      type='submit'
                      color={"#001a2c"}>
                      Book Car
                    </Button>
                  </form>
                  {dateFrom | (dateTo === "") ? (
                    ""
                  ) : (
                    <Flex
                      width={"100%"}
                      alignItems={"center"}
                      justifyContent={"center"}>
                      <UnorderedList
                        px={4}
                        width={"90%"}
                        pt={4}
                        listStyleType={"none"}
                        color={"#ffffff"}
                        fontSize={17}
                        fontWeight={600}>
                        <Text fontWeight={600} fontSize={20}>
                          Summary
                        </Text>
                        <ListItem
                          display={"flex"}
                          justifyContent={"space-between"}>
                          <Text fontSize={16} fontWeight={400}>
                            Days:
                          </Text>{" "}
                          <Text>{dayjs(dateTo).diff(dateFrom, "days")}</Text>
                        </ListItem>
                        <ListItem
                          display={"flex"}
                          justifyContent={"space-between"}>
                          <Text fontSize={16} fontWeight={400}>
                            Total(£):
                          </Text>

                          <Text>
                            £{dayjs(dateTo).diff(dateFrom, "days") * data.price}
                          </Text>
                        </ListItem>
                      </UnorderedList>
                    </Flex>
                  )}
                </Box>
              )}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default SingleCar;
