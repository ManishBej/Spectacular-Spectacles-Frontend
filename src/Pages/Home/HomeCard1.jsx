import React from "react";
import { Box, Image, Heading, Text } from "@chakra-ui/react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const HomeCard1 = ({ type }) => {
  return (
    <Box cursor="pointer" p="-1">
      <Box>
        <Slide>
          {type.map((i) => (
            <Box key={i}>
              <Image src={`${i.img}`} alt={i.caption} w="100%" />
            </Box>
          ))}
        </Slide>
      </Box>
      <Box textAlign="center" py={10}>
        <Heading as="h1" size="2xl" mb={4}>
          Welcome to Spectacular Spectacles
        </Heading>
        <Text fontSize="xl" color="gray.600">
          Discover Your Perfect Pair of Designer Eyewear
        </Text>
      </Box>
    </Box>
  );
};

export default HomeCard1;
