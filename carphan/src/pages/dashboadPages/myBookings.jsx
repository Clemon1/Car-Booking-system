import {
  Box,
  Flex,
  Text,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/slices/authSLice";
import Sidebar from "../../components/sidebar";
import TopNav from "../../components/TopNav";
import { useGetBookingQuery } from "../../redux/api_Slices/bookingSlice";
const MyBookings = () => {
  const user = useSelector(currentUser);
  const { data: bookings = [] } = useGetBookingQuery(user.otherInfo._id);

  console.log("bookings", bookings);
  return (
    <Box className='home1' width={"100%"} height={"fit-content"} bg={"#00111C"}>
      <Flex width={"100%"} height={"fit-content"} bg={"#00111C"}>
        <Sidebar />
        <Box width={"100%"} height={"100vh"} bg={"#00111C"} paddingY={4}>
          <TopNav />
          <Box paddingX={10} paddingY={2} width={"full"} height={"8vh"}>
            <Text fontSize={20} fontWeight={500} color={"#ffffff"}>
              My Bookings
            </Text>
          </Box>

          <Flex
            bg={"#00111C"}
            width={"100%"}
            height={"150vh"}
            paddingX={10}
            justifyContent={"center"}>
            <TableContainer
              width={"100%"}
              height={"fit-content"}
              bg={"#00283F"}
              padding={3}
              rounded={16}>
              <Table colorScheme='teal' rounded={12}>
                <Thead>
                  <Tr>
                    <Th color={"#ffffff"}>Booking ID</Th>
                    <Th color={"#ffffff"}>Car Name</Th>
                    <Th color={"#ffffff"}> Price (£)</Th>
                    <Th color={"#ffffff"}> From</Th>
                    <Th color={"#ffffff"}> To</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {bookings.map((booking) => (
                    <>
                      <Tr key={booking._id}>
                        <Td color={"#ffffff"}>{booking._id}</Td>
                        <Td color={"#ffffff"}>{booking.carId.name}</Td>
                        <Td color={"#ffffff"}>
                          £
                          {dayjs(booking.dateTo).diff(
                            booking.dateFrom,
                            "days",
                          ) * booking.carId.price}
                        </Td>
                        <Td color={"#ffffff"}>
                          {dayjs(booking.dateFrom).format(`DD/MM/YYYY`)}
                        </Td>
                        <Td color={"#ffffff"}>
                          {" "}
                          {dayjs(booking.dateTo).format(`DD/MM/YYYY`)}
                        </Td>
                      </Tr>
                    </>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default MyBookings;
