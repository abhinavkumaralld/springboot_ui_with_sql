import jwt_decode from "jwt-decode";

export const extractPayload = (token) => {
  try {
    const decoded = jwt_decode(token);
    console.log("Decoded Payload:", decoded);
    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds
    return decoded.exp < currentTime;
  } catch (error) {
    return true; // Invalid token
  }
};
