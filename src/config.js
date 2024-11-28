export const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const BRAND = {
  name: "Spectacular Spectacles",
  shortName: "Spectacular",
  tagline: "Discover Your Perfect Pair of Designer Eyewear",
  description: "Your premium destination for designer eyewear",
  colors: {
    primary: "#000042",
    accent: "#18CFA8",
    text: "#333368"
  }
};

export const API_ENDPOINTS = {
  auth: `${BASE_URL}/auth`,
  products: `${BASE_URL}/products`,
  cart: `${BASE_URL}/cart`,
  orders: `${BASE_URL}/orders`,
  user: `${BASE_URL}/user`
};
