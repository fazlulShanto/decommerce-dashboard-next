import * as jose from "jose";
const sampleData = {
  userId: "1234567890",
  role: "admin",
  guildId: "811639285756723263",
  guildName: "Test Guild",
};
const secret = "my-test-secret";

const token = await new jose.SignJWT(sampleData)
  .setProtectedHeader({ alg: "HS256" })
  .setIssuedAt()
  .setIssuer("bot:user:1234567890")
  .setExpirationTime("20d")
  .sign(new TextEncoder().encode(secret));
console.log(token);

const decodeJWT = async (token) => {
  if (!token) {
    return null;
  }
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
};

decodeJWT(token);
