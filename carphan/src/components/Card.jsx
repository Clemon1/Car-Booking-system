import {
  Card,
  CardBody,
  Image,
  Text,
  Stack,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
// import car4 from "../assets/Image/car4.jpg";
// eslint-disable-next-line react/prop-types
const CardComponent = ({ name, image, price, ratings, link }) => {
  return (
    <Card
      width={["100%", "100%", "45%", "45%", "30%"]}
      height={"45vh"}
      bg={"#00283F"}
      rounded={12}>
      <Link to={link}>
        <CardBody padding={0} bg={"#00283F"} rounded={12}>
          <Image
            src={image}
            width={"full"}
            height={"30vh"}
            objectFit={"cover"}
            alt='Green double couch with wooden legs'
            roundedTop={12}
          />
          <Stack mt='0' spacing='3' padding={2}>
            <Text
              fontWeight={600}
              fontSize={"18px"}
              color={"#ffffff"}
              noOfLines={1}>
              {name}
            </Text>
            <Flex width={"full"} justifyContent={"space-between"}>
              <Text color={"#ffffff"} fontSize={16} fontWeight={"bold"}>
                £{price}/
                <span style={{ fontWeight: 400, fontSize: 15 }}>day</span>
              </Text>
              <Flex width={"full"} justifyContent={"flex-end"}>
                <Icon fontSize={20} as={FaStar} color={"yellow"} />
                <Text color={"#ffffff"} fontSize={16} fontWeight={"bold"}>
                  {ratings}
                </Text>
              </Flex>
            </Flex>
          </Stack>
        </CardBody>
      </Link>
    </Card>
  );
};

export default CardComponent;
