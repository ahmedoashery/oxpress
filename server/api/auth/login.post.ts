// import z, { object, string } from 'zod'
import Joi from "joi";
import { sign } from "jsonwebtoken";

const refreshTokens: Record<number, Record<string, any>> = {};
export const SECRET = "dummy";

export default eventHandler(async (event) => {
  const body = await readBody(event);
  const reqUser = {
    username: body.username,
    password: body.password,
  };
  const schema = Joi.object({
    username: Joi.string().alphanum().min(6).max(64).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,64}$/).message("password: (6-64) Alphanum & (Special chars eg: @,$)"),
    repeat_password: Joi.ref("password"),
    access_token: [Joi.string(), Joi.number()],
    refresh_token: [Joi.string(), Joi.number()],
    email: Joi.string().email(),
  });

  const { error, value } = await schema.validateAsync(reqUser, { abortEarly: false, errors: { escapeHtml: true, label: "key", wrap: {label: false,array: false,string: false} } });
  if (error) {
    console.log(JSON.stringify(error));
    return error;
  }

  const expiresIn = 15;
  const refreshToken =
    Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1;
  const { username } = value;
  const user = {
    username,
    picture: "https://github.com/nuxt.png",
    name: "User " + username,
  };

  const accessToken = sign({ ...user, scope: ["test", "user"] }, SECRET, {
    expiresIn,
  });
  refreshTokens[refreshToken] = {
    accessToken,
    user,
  };

  return {
    token: {
      accessToken,
      refreshToken,
    },
  };
});
