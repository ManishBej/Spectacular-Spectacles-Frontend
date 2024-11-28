import React, { useContext, useState } from "react";
import { AuthContext } from "../../ContextApi/AuthContext";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import {
  Checkbox,
  useDisclosure,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Box,
  Heading,
  Input,
  HStack,
  Flex,
  Center,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [btn, setbtn] = useState();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [pass, setpass] = useState(false);
  const [show, setShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setisAuth, setAuthData } = useContext(AuthContext);
  const [incorrect, setinCorrect] = useState(false);
  const navigate = useNavigate();
  let res1 = [];

  const handlechange = (e) => {
    setinCorrect(false);
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });

    if (name === "email") {
      const buton = (
        <Box
          fontSize={"14px"}
          mt="5px"
          color={"#ff1f1f"}
          fontWeight="500"
          letterSpacing={"-0.4px"}
        >
          Please enter a valid Email or Mobile Number.
        </Box>
      );
      setbtn(buton);
    }
  };

  const handleClick = () => {
    setLoginData({ ...loginData, password: "" });
    setpass(false);
  };

  const handlesign = () => {
    if (!pass) {
      // First step - email entered
      if (loginData.email && loginData.email.includes("@") && loginData.email.includes(".com")) {
        setpass(true);
      }
    } else {
      // Second step - password entered
      if (loginData.password && loginData.password.length >= 6) {
        getData(loginData);
      }
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      setinCorrect(false);
      console.log("Attempting login with:", { email: loginData.email });

      if (loginData.email === "" || loginData.password === "") {
        throw new Error("Email and password are required");
      }

      console.log("Making login request to:", `${BASE_URL}/user/login`);
      const res = await fetch(
        `${BASE_URL}/user/login`,
        {
          method: "POST",
          body: JSON.stringify(loginData),
          headers: {
            "Content-type": "application/json"
          }
        }
      );
      
      console.log("Login response status:", res.status);
      
      if (!res.ok) {
        const errorData = await res.text();
        console.error("Login failed:", errorData);
        throw new Error(`Login failed: ${res.status} ${errorData}`);
      }

      let data = await res.json();
      console.log("Login successful, token received");
      
      console.log("Fetching user data from:", `${BASE_URL}/user`);
      const credential = await fetch(
        `${BASE_URL}/user`
      );
      
      if (!credential.ok) {
        console.error("Failed to fetch user data:", credential.status);
        throw new Error('Failed to fetch user data');
      }

      let cred = await credential.json();
      console.log("Found users:", cred.length);
      
      localStorage.setItem("token", data.token);
      res1 = cred.filter((el) => el.email === loginData.email);
      console.log("Matching users found:", res1.length);
      
      if (res1.length === 0) {
        throw new Error('User not found in database');
      }

      setisAuth(true);
      setAuthData(res1);
      
      if (loginData.email.includes("admin")) {
        console.log("Admin user detected, redirecting to product list");
        setLoading(false);
        setinCorrect(false);
        onClose();
        navigate("/productlist");
      } else {
        console.log("Regular user login successful");
        setLoading(false);
        setinCorrect(false);
        onClose();
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setLoading(false);
      setinCorrect(true);
    }
  };

  return (
    <div>
      <Center onClick={onOpen} fontWeight={"400"} fontSize="15px" w="80px">
        Sign In
      </Center>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ xl: "md", lg: "md", md: "md", sm: "md", base: "sm" }}
      >
        <ModalOverlay />
        <ModalContent rounded="3xl">
          <ModalCloseButton
            borderRadius={"50%"}
            bg="white"
            m={"10px 10px 0px 0px"}
          />

          <ModalBody p={"0px 0px "} borderRadius={"15px 15px 15px 15px "}>
            <Image
              src="https://static1.lenskart.com/media/desktop/img/DesignStudioIcons/DesktopLoginImage.svg"
              alt="pic"
              borderRadius={"10px 10px 0px 0px "}
            />
            <Box m={"34px 45px 50px 45px"}>
              <Heading
                fontFamily={" Times, serif"}
                fontWeight="100"
                fontSize={"28px"}
                mb="24px"
                color={"#333368"}
              >
                Sign In
              </Heading>

              {pass === false ? (
                <>
                  <Input
                    name="email"
                    placeholder="Email"
                    h={"50px"}
                    fontSize="16px"
                    focusBorderColor="rgb(206, 206, 223)"
                    borderColor={"rgb(206, 206, 223)"}
                    onChange={handlechange}
                    value={loginData.email}
                    rounded="2xl"
                  />
                  {!loginData.email.includes("@") || !loginData.email.includes(".com") ? btn : null}
                </>
              ) : (
                <Box>
                  <Box fontSize={"17px"} color="#66668e">
                    Enter password for
                  </Box>

                  <Flex
                    justifyContent={"space-between"}
                    fontFamily={" sans-serif"}
                    mb="22px"
                    color={"#000042"}
                  >
                    <Box fontSize="18px">{loginData.email}</Box>
                    <Box
                      fontSize={"14px"}
                      textDecoration="underline"
                      onClick={handleClick}
                      cursor="pointer"
                    >
                      Edit
                    </Box>
                  </Flex>

                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
                      h={"50px"}
                      fontSize="16px"
                      focusBorderColor="rgb(206, 206, 223)"
                      borderColor={"rgb(206, 206, 223)"}
                      onChange={handlechange}
                      value={loginData.password}
                      rounded="2xl"
                    />

                    <InputRightElement width="6.5rem" size="lg">
                      <Button
                        size="md"
                        borderRadius="3xl"
                        mt="10%"
                        onClick={() => setShow(!show)}
                        bg="white"
                      >
                        {show ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  {incorrect && (
                    <Box
                      fontSize={"14px"}
                      m="3px 0px 3px 0px"
                      color={"#ff1f1f"}
                      fontWeight="500"
                      ml="2"
                      letterSpacing={"-0.4px"}
                    >
                      Wrong email or password
                    </Box>
                  )}
                </Box>
              )}
              <Box
                textDecoration={"underline"}
                m="15px 0px 0px 0px"
                color="#000042"
                fontSize="15px"
              >
                Forget Password
              </Box>
              <HStack fontSize="16px">
                <Checkbox mb={"20px"} mt="20px" size="sm">
                  Get Update on whatsapp
                </Checkbox>
                <Image
                  src="https://static.lenskart.com/media/desktop/img/25-July-19/whatsapp.png"
                  w={"22px"}
                  h="22px"
                />
              </HStack>
              <Button
                isLoading={loading}
                onClick={handlesign}
                bgColor={
                  !pass
                    ? loginData.email && loginData.email.includes("@") && loginData.email.includes(".com")
                      ? "#11daac"
                      : "#cccccc"
                    : loginData.password && loginData.password.length >= 6
                    ? "#11daac"
                    : "#cccccc"
                }
                width="100%"
                borderRadius={"35px/35px"}
                h="50px"
                fontSize="18px"
                _hover={{
                  backgroundColor: !pass
                    ? loginData.email && loginData.email.includes("@") && loginData.email.includes(".com")
                      ? "#11daac"
                      : "#cccccc"
                    : loginData.password && loginData.password.length >= 6
                    ? "#11daac"
                    : "#cccccc"
                }}
              >
                Sign In
              </Button>
              <HStack spacing={"0px"} mt="19px" gap="2">
                <Box fontSize={"14px"}> New member?</Box>
                <Link
                  fontSize={"15px"}
                  fontWeight="500"
                  textDecoration={"underline"}
                >
                  Create an Account
                </Link>
              </HStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Login;
