import { defaultAuthEnv, env } from "../src/mod.ts";
import { Auth, Bot, type Destination } from "../src/mod.ts";
import { Hono } from "jsr:@hono/hono";

// Read envs
const botConfig = env([
  "LINEWORKS_BOT_ID",
  "LINEWORKS_BOT_SECRET",
  "LINEWORKS_DEST",
  "LINEWORKS_ID",
]);

// Create Bot instance
const bot = new Bot(
  botConfig.LINEWORKS_BOT_ID,
  botConfig.LINEWORKS_BOT_SECRET,
  new Auth(defaultAuthEnv(), ["bot"]),
);

// Send message
await bot.send(
  botConfig.LINEWORKS_DEST as Destination,
  botConfig.LINEWORKS_ID,
  {
    content: {
      type: "text",
      text: `Hello ${botConfig.LINEWORKS_ID}`,
    },
  },
);

// Register callback handler
bot.on("message", (c) => {
  if (c.event.content.type == "text") {
    return c.reply({
      content: {
        type: "text",
        text: `echo message: ${c.id()} -> "${c.event.content.text}"`,
      },
    });
  }
});

// Mount app
const app = new Hono();
app.mount("/callback", bot.fetch);
Deno.serve(app.fetch);
