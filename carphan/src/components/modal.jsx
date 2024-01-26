/* eslint-disable react/prop-types */

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Text,
  ModalBody,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";

const TokenResetModal = ({ isOpen, onClose, handleLogin }) => {
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#00283F"} rounded={12}>
          <form onSubmit={handleLogin}>
            <ModalHeader color={"#ffffff"}>
              Your session has expired!
            </ModalHeader>
            <ModalCloseButton color={"#ffffff"} />
            <ModalBody>
              <Text color={"#ffffff"}>
                Please Login again to continue using the app.
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button
                type='submit'
                colorScheme='blue'
                mr={3}
                rounded={12}
                bg={"#00e995"}
                color={"#001a2c"}
                onClick={onClose}>
                LogIn
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TokenResetModal;
