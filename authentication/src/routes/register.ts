import { Router } from "express";
import { prisma } from "../database";
import { hash } from "bcrypt";
import { saltRounds } from "../constants";
import { generateToken } from "../helpers/generate";
const router = Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
    if(username===null){
        return res.status(400).json({error:"Username is required."})
    }
    if(password===null) return res.status(400).json({error:"Password is required"})
    if(email===null) return res.status(400).json({error:"Password is required"})
  const userWithSameEmail = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  const userWithSameUsername = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (userWithSameEmail !== null) {
    return res.status(400).json({
      error: "A User with this email already exists",
    });
  }
  if (userWithSameUsername !== null) {
    return res.status(400).json({
      error: "A User with this username already exists",
    });
  }
  const passwordHash = await hash(password, saltRounds);
  await prisma.user.create({
    data: {
      username,
      email,
      password: passwordHash,
    },
  });
  const jwt = generateToken({
    username,
    email,
  });
  return res.status(200).json({
    username,
    token: jwt,
  });
});

export { router as registerRouter };
