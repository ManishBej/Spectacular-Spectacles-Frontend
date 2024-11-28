import React from "react";
import { Box, Grid, Center, Image, Text, Stack, Heading, Link } from "@chakra-ui/react";
import { FooterCard1, FooterCard2, FooterCard } from "./FooterCard";
import { about, helps } from "./FooterDetails";
import logo from "./logo.svg";

const Footer = () => {
  return (
    <Box
      bgColor="#000042"
      color="whiteAlpha.900"
      p={{ lg: "0", md: "5", base: "5" }}
    >
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(2,1fr)"
        }}
        justifyContent="space-between"
        textAlign="left"
        ml="2%"
      >
        <Box w="60%" pl="5">
          <Grid
            templateColumns={{
              base: "repeat(1,1fr)",
              sm: "repeat(2,1fr)",
              md: "repeat(2,1fr)",
              lg: "repeat(3,1fr)"
            }}
            gap="5"
          >
            <Box>
              <Image src={logo} alt="Spectacular Spectacles" width="120px" />
              <Text fontSize="sm" mt={2}>
                &copy; 2024 Spectacular Spectacles. All rights reserved.
              </Text>
            </Box>
            <Stack>
              <Heading size="md">Services</Heading>
              <Link>Store Locator</Link>
              <Link>Virtual Try-On</Link>
              <Link>Spectacular Care</Link>
              <Link>Premium Eyewear</Link>
            </Stack>
            <FooterCard1 type={about} heading="About Us" />
            <FooterCard1 type={helps} heading="Help" />
          </Grid>
        </Box>
        <Center>
          <FooterCard2 />
        </Center>
      </Grid>
      <hr />
      <FooterCard />
    </Box>
  );
};

export default Footer;
