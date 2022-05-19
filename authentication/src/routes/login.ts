import { Router } from "express";
import { prisma } from "../database";
import { compare } from "bcrypt";
import { generateToken } from "../helpers/generate";
const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
    if(email==null) return res.status(400).json({error:"Email is required"})
    if(password==null) return res.status(400).send({error:"Password in required"})
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (user === null) return res.status(400).json({ error: "User not found" });
    
  const isMatch = await compare(password, user.password);
  if (isMatch === false) {
    return res.status(400).json({ error: "Incorrect Password!" });
  }
  const jwt = generateToken({
    username: user.username,
    email: user.email,
  });
  return res.status(200).json({
    username: user.username,
    token: jwt,
  });
});

export { router as loginRouter };
