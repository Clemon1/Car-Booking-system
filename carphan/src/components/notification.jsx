/* eslint-disable react/prop-types */
import { Text, Flex, Button } from "@chakra-ui/react";
import { currentUser } from "../redux/slices/authSLice";
import { useSelector } from "react-redux";
import {
  useUserNotificationQuery,
  useUpdateNotificationMutation,
} from "../redux/api_Slices/notificationSlice";
// import { useEffect } from "react";

const Notification = () => {
  const user = useSelector(currentUser);
  const logUser = user && user.otherInfo && user.otherInfo._id;

  const { data = [] } = useUserNotificationQuery(logUser, {
    pollingInterval: 8000,
  });
  const [updateNotification] = useUpdateNotificationMutation();
  console.log("notification", data);

  const handleUpdate = async ({ id }) => {
    try {
      await updateNotification({
        id,
        isRead: true,
      }).unwrap();
    } catch (error) {
      console.log("Notification Error", error.data);
    }
  };

  return (
    <Flex
      width={"25%"}
      height={"50vh"}
      zIndex={3000}
      padding={1}
      rounded={12}
      bg={"#00283F"}
      overflowY={"scroll"}
      top={"70px"}
      right={"64px"}
      flexDirection={"column"}
      gap={4}
      position={"fixed"}>
      <Flex width={"100%"} height={"100%"} flexDirection={"column"} gap={4}>
        {data && data.notify.length > 0 ? (
          data.notify.map((e) => (
            <Flex
              key={e._id}
              width={"100%"}
              height={"fit-content"}
              px={2}
              py={1}
              flexDirection={"column"}
              alignItems={"flex-start"}
              rounded={12}
              bg={e.isRead === true ? "#00111C" : "rgb(0, 233, 149)"}>
              <Text
                color={e.isRead === true ? "#ffffff" : "#00111C"}
                fontSize={16}
                fontWeight={600}>
                {e.title}
              </Text>

              <Text
                color={e.isRead === true ? "#ffffff" : "#00111C"}
                fontSize={15}
                fontWeight={500}>
                {e.message}
              </Text>
              <Button
                padding={2}
                onClick={() => handleUpdate({ id: e._id })}
                right={0}
                height={"10px"}>
                read
              </Button>
            </Flex>
          ))
        ) : (
          <>
            <Flex
              width={"100%"}
              height={"40vh"}
              justifyContent={"center"}
              alignItems={"center"}>
              <Text color={"#ffffff"} fontSize={17} fontWeight={600}>
                No notification found
              </Text>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Notification;
