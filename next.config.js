/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  env: {
    SECRET_KEY: "OJuZVgT6cGSz9tq7Xz0BtQactb9n7AuVnA4Nvsan3KQ=",
    MONGODB_URI:
      "mongodb+srv://angad:Angad1234@cluster0.5xl6h.mongodb.net/dishaDB?retryWrites=true&w=majority",
    SendEmail: "angadg00@gmail.com",
    SendPassword: "cnsuyuohviztftxl",
  },
};

module.exports = nextConfig;
