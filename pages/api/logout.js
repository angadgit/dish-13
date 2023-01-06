import cookie from "cookie";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("OursiteJWT", "", {
      httpOnly: true,
      // secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  res.json({ success: true });
}
