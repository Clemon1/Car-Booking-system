import { Flex, Text, UnorderedList, ListItem, Icon } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { IoPersonSharp, IoCarSportSharp } from "react-icons/io5";
import { isLogOut } from "../redux/slices/authSLice";
import { useDispatch } from "react-redux";
const Sidebar = () => {
  let activeStyle = {
    width: "100%",
    color: "#001a2c",
    borderRadius: "14px",
    fontWeight: "600",
    transition: " 0.8s ease-in-out all ",
    background: "#00e995",
  };
  const dispatch = useDispatch();
  const logOut = (e) => {
    e.preventDefault();

    dispatch(isLogOut());
  };
  return (
    <Flex
      width={"22%"}
      height={"100vh"}
      display={["none", "none", "none", "none", "block"]}
      bg={"#00111C"}
      borderRight={"2px #00283F solid"}>
      <Flex
        width={"18%"}
        bg={"#00111C"}
        borderRight={"2px #00283F solid"}
        height={"100vh"}
        flexDirection={"column"}
        padding={4}
        gap={10}
        position={"fixed"}>
        <Link to={"/dashboard"}>
          <Text
            color={"#ffffff"}
            textAlign={"center"}
            fontSize={30}
            fontWeight={600}>
            AIVIIO.
          </Text>
        </Link>

        <Flex width={"full"} height={"100%"} flexDirection={"column"}>
          <UnorderedList
            color={"#ffffff"}
            margin={0}
            display={"flex"}
            flexDirection={"column"}
            gap={5}
            alignItems={"flex-start"}
            listStyleType={"none"}>
            <NavLink
              to='/dashboard'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              <ListItem
                paddingLeft={35}
                fontSize={16}
                paddingY={3}
                display={"flex"}
                gap={2}
                alignItems={"center"}>
                <Icon fontSize={20} as={MdDashboardCustomize} /> Dashboard
              </ListItem>
            </NavLink>
            <NavLink
              to='/my-bookings'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              <ListItem
                paddingLeft={35}
                fontSize={16}
                paddingY={3}
                gap={2}
                display={"flex"}
                alignItems={"center"}>
                <Icon fontSize={20} as={TbListDetails} /> My Booking
              </ListItem>
            </NavLink>
            <NavLink
              to='/myvehicles'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              <ListItem
                paddingLeft={35}
                fontSize={16}
                paddingY={3}
                display={"flex"}
                gap={2}
                alignItems={"center"}>
                <Icon fontSize={20} as={IoCarSportSharp} /> My Vehicles
              </ListItem>
            </NavLink>
            <NavLink
              to='/profile'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              <ListItem
                paddingLeft={35}
                fontSize={16}
                paddingY={3}
                gap={2}
                display={"flex"}
                alignItems={"center"}>
                <Icon fontSize={20} as={IoPersonSharp} /> Profile
              </ListItem>
            </NavLink>

            <ListItem
              onClick={logOut}
              cursor={"pointer"}
              paddingLeft={35}
              fontSize={16}
              position={"relative"}
              paddingY={3}
              gap={2}
              top={20}
              display={"flex"}
              alignItems={"center"}>
              <Icon fontSize={20} as={IoPersonSharp} /> LogOut
            </ListItem>
          </UnorderedList>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
