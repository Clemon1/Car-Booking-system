/* eslint-disable react/prop-types */
import { Flex, Avatar, Text, Button, Icon } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { currentUser } from "../redux/slices/authSLice";
import { IoNotifications } from "react-icons/io5";
import SearchBar from "./searchBar";
import { Link } from "react-router-dom";
import Notification from "./notification";
import { useState } from "react";
import { useUserNotificationQuery } from "../redux/api_Slices/notificationSlice";
const TopNav = () => {
  const user = useSelector(currentUser);
  const logUser = user && user.otherInfo && user.otherInfo._id;
  const [notify, setNotify] = useState(false);
  const { data = [] } = useUserNotificationQuery(logUser, {
    pollingInterval: 8000,
  });

  // console.log("notification", data);
  return (
    <Flex
      width={"full"}
      height={"8vh"}
      paddingX={12}
      rounded={12}
      gap={1}
      alignItems={"center"}>
      <Link to={"/dashboard"}>
        <Text
          color={"#ffffff"}
          textAlign={"center"}
          display={["flex", "flex", "flex", "flex", "none"]}
          fontSize={[20, 20, 20, 20, 30]}
          fontWeight={600}>
          AIVIIO.
        </Text>
      </Link>
      <Flex
        width={"100%"}
        display={["none", "none", "none", "flex", "flex"]}
        justifyContent={"flex-end"}>
        <SearchBar />
      </Flex>
      <Flex
        width={"65%"}
        gap={3}
        justifyContent={"flex-end"}
        alignItems={"center"}>
        <Button
          width={"fit-content"}
          onClick={() => setNotify(!notify)}
          bg={"transparent"}
          _hover={{}}
          color={"#ffffff"}>
          <Icon as={IoNotifications} fontSize={20} />
          <Flex
            bg={"red"}
            display={
              data && data.countNew && data.countNew.length <= 0
                ? "none"
                : "flex"
            }
            padding={2}
            width={"34px"}
            height={"32px"}
            alignItems={"center"}
            rounded={"full"}
            position={"relative"}
            top={"12px"}
            textAlign={"center"}
            color={"#ffffff"}
            fontSize={16}>
            {data && data.countNew && data.countNew.length}
          </Flex>
        </Button>
        {notify && <Notification />}
        <Text fontWeight={500} color={"#ffffff"}>
          {user && user.otherInfo.firstName} {user && user.otherInfo.lastName}
        </Text>
        <Avatar
          name={`${user && user.otherInfo.firstName} ${
            user && user.otherInfo.lastName
          }`}
          src=''
          size='sm'
        />
      </Flex>
    </Flex>
  );
};

export default TopNav;
