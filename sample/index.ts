import {
  Auth,
  bind,
  Bot,
  BotMessageBuilder as Builder,
  DEFAULT_CREDENTIAL_BINDINGS,
  type Destination,
} from "../src/mod.ts";
import { Hono } from "jsr:@hono/hono";

// Read envs
const botConfig = bind({
  id: "LINEWORKS_BOT_ID",
  secret: "LINEWORKS_BOT_SECRET",
  dest: "LINEWORKS_DEST",
  to: "LINEWORKS_ID",
});

// Create Bot instance
const bot = new Bot(
  botConfig.id,
  botConfig.secret,
  new Auth(bind(DEFAULT_CREDENTIAL_BINDINGS), ["bot"]),
);

// Send message
await bot.send(
  botConfig.dest as Destination,
  botConfig.to,
  Builder.text(`Hello ${Builder.mention(botConfig.to)} !`),
);

// Register callback handler
bot.on("message", (c) => {
  if (c.event.content.type == "text") {
    return c.reply(
      Builder.text(
        `echo message: ${Builder.mention(c.id())} "${c.event.content.text}"`,
      ),
    );
  }
});

// Mount app
const app = new Hono();
app.mount("/callback", bot.fetch);
Deno.serve(app.fetch);
