import JWT from "jsonwebtoken";
import { once } from "node:events";
import { createServer } from "node:http";

const validUser = {
  user: "juliano",
  password: "123",
};

const JWT_KEY = 'abc123'

async function loginRoute(req, res) {
  const { user, password } = JSON.parse(await once(req, "data"));
  console.log('passou')

  if (user !== validUser.user || password !== validUser.password) {
    res.writeHead(401);
    res.end(JSON.stringify({ error: "wrong credentials" }));
    return;
  }

  const token = JWT.sign({ user, message: ':)' }, JWT_KEY)

  res.end(JSON.stringify({ token }));
}

async function handler(req, res) {
  if (req.url === "/login" && req.method === "POST") {
    return loginRoute(req, res);
  }

  res.end("hello world");
}

const app = createServer(handler).listen(3000, () =>
  console.log("running at 3000")
);

export { app };
