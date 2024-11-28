import React from "react";
import { Box } from "@chakra-ui/react";

const HomeCard7 = () => {
  return (
    <Box
      w="100%"
      m="auto"
      bgColor="#000042"
      color="whiteAlpha.900"
      pt={9}
      pl={9}
    >
      <Box fontSize="35px" w="97%" margin="auto">
        Discover Premium Eyewear at Spectacular Spectacles
      </Box>
      <br />
      <Box fontSize="15px" w="97%" margin="auto" pb="5" textAlign="justify">
        <Box w="95%">
          Spectacular Spectacles is your premier destination for designer eyewear in India. 
          We've transformed the eyewear industry with our innovative approach to style and service. 
          From our expanding network of boutique stores across major cities to our cutting-edge 
          online shopping experience, we ensure every customer finds their perfect pair with 
          exclusive deals and personalized service.
        </Box>
        <br />
        <Box w="95%" textAlign="justify">
          As your complete eyewear solution, Spectacular Spectacles delivers premium eyewear 
          and accessories directly to your doorstep with convenient payment options. Our curated 
          collection of sunglasses and eyeglasses for men and women features the latest trends 
          and timeless classics from renowned designer brands.
        </Box>
      </Box>
    </Box>
  );
};

export default HomeCard7;
