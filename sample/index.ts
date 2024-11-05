import { Auth, Bot, type Destination } from "../src/mod.ts";
import { Hono } from "jsr:@hono/hono";

const config: { [key: string]: string } = {};

// Check environment variables
[
  "LINEWORKS_CLIENT_ID",
  "LINEWORKS_CLIENT_SECRET",
  "LINEWORKS_SERVICE_ACCOUNT",
  "LINEWORKS_PRIVATE_KEY",

  "LINEWORKS_BOT_ID",
  "LINEWORKS_BOT_SECRET",

  "LINEWORKS_DEST",
  "LINEWORKS_ID",
].map((key) => {
  if (!Deno.env.has(key)) {
    throw new Error(`Environment variable is not set: ${key}`);
  }
  config[key] = Deno.env.get(key) ?? "";
});

const auth = new Auth({
  clientId: config["LINEWORKS_CLIENT_ID"],
  clientSecret: config["LINEWORKS_CLIENT_SECRET"],
  serviceAccount: config["LINEWORKS_SERVICE_ACCOUNT"],
  privateKey: config["LINEWORKS_PRIVATE_KEY"],
}, ["bot"]);

const bot = new Bot(
  config["LINEWORKS_BOT_ID"],
  config["LINEWORKS_BOT_SECRET"],
  auth,
);

await bot.send(
  config["LINEWORKS_DEST"] as Destination,
  config["LINEWORKS_ID"],
  {
    content: {
      type: "text",
      text: `Hello ${config["LINEWORKS_ID"]}`,
    },
  },
);

bot.on("message", async (c) => {
  if (c.e.content.type == "text") {
    await c.reply({
      content: {
        type: "text",
        text: `echo message: ${c.e.content.text}`,
      },
    });
  }
});

const app = new Hono();
app.mount("/callback", bot.fetch);

Deno.serve(app.fetch);
