import { Box, Flex, Text } from "@chakra-ui/react";
import Sidebar from "../../components/sidebar";
import TopNav from "../../components/TopNav";
import CardComponent from "../../components/Card";
import {
  useGetCarsQuery,
  useRecommendCarQuery,
} from "../../redux/api_Slices/carSlice";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/slices/authSLice";
const Dashboard = () => {
  const user = useSelector(currentUser);
  const { data: cars = [] } = useGetCarsQuery();
  const { data: recommend = [] } = useRecommendCarQuery(
    user.otherInfo.location,
  );
  console.log("cars", cars);

  return (
    <Box className='home1' width={"100%"} height={"fit-content"} bg={"#00111C"}>
      <Flex width={"100%"} height={"fit-content"} bg={"#00111C"}>
        <Sidebar />
        <Box width={"100%"} height={"100vh"} bg={"#00111C"} paddingY={4}>
          <TopNav />
          <Box paddingX={10} width={"full"}>
            <Text fontSize={20} fontWeight={500} color={"#ffffff"}>
              All cars
            </Text>
          </Box>
          {/* <Flex
            paddingX={10}
            width={"100%"}
            height={"15vh"}
            alignItems={"center"}>
            <Flex width={"full"} height={"100%"} alignItems={"center"} gap={2}>
              {["Convertable", "SUV", "Seren", "Automatic"].map((tag, key) => (
                <Tag
                  key={key}
                  padding={3}
                  rounded={20}
                  cursor={"pointer"}
                  variant='solid'
                  bg={"#00283F"}>
                  {tag}
                </Tag>
              ))}
            </Flex>
            <Flex width={"30%"} justifyContent={"flex-end"}>
              <Button
                bg={"transparent"}
                color={"#ffffff"}
                fontSize={18}
                _hover={{}}>
                See All
              </Button>
            </Flex>
          </Flex> */}
          <Flex
            bg={"#00111C"}
            gap={"1rem"}
            width={"100%"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            height={[
              "fit-content",
              "fit-content",
              "fit-content",
              "fit-content",
              "100vh",
            ]}
            paddingX={[4, 4, 8, 10, 10]}>
            {cars.length <= 0 && (
              <Text color={"#ffffff"} fontSize={19} fontWeight={500}>
                No cars available
              </Text>
            )}

            {cars.map((car) => (
              <CardComponent
                key={car._id}
                name={car.name}
                image={`http://localhost:4000/${car.image}`}
                price={car.price}
                link={`/car/${car._id}`}
                ratings={4.2}
              />
            ))}
          </Flex>
          {recommend.length > 0 && (
            <Box width={"full"}>
              <Flex
                bg={"#00111C"}
                gap={"1rem"}
                width={"100%"}
                wrap={"wrap"}
                height={"12vh"}
                paddingX={10}>
                <Text fontSize={19} fontWeight={500} color={"#ffffff"}>
                  Cars users are booking in {user && user.otherInfo.location}.
                </Text>
              </Flex>
              <Flex
                bg={"#00111C"}
                gap={"1rem"}
                width={"100%"}
                wrap={"wrap"}
                height={"100vh"}
                paddingX={10}>
                {recommend.map((carReco, key) => (
                  <CardComponent
                    key={key}
                    name={carReco.name}
                    image={`http://localhost:4000/${carReco.image}`}
                    price={carReco.price}
                    link={`/car/${carReco._id}`}
                    ratings={4.2}
                  />
                ))}
              </Flex>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;
