const BaseUrl =
  process.env.NODE_ENV === "production"
    ? "http://64.227.168.0"
    : "http://localhost:3000";
export default BaseUrl;
