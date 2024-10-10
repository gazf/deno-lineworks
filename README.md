# deno-lineworks

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/gazf/deno-lineworks/test.yml)](https://github.com/gazf/deno-lineworks/actions)
[![GitHub](https://img.shields.io/github/license/gazf/deno-lineworks)](https://github.com/gazf/deno-lineworks/blob/main/LICENSE)
[![JSR](https://jsr.io/badges/@gazf/deno-lineworks)](https://jsr.io/@gazf/deno-lineworks)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/gazf/deno-lineworks)](https://github.com/gazf/deno-lineworks/pulse)
[![GitHub last commit](https://img.shields.io/github/last-commit/gazf/deno-lineworks)](https://github.com/gazf/deno-lineworks/commits/main)

This package is for easy use of [LINE WORKS](https://line-works.com/).

## Basic usage

```typescript
import { Auth, Bot } from "@gazf/deno-lineworks";

const auth = new Auth({
  clientId: "YOUR_LINEWORKS_CLIENT_ID",
  clientSecret: "YOUR_LINEWORKS_CLIENT_SECRET",
  serviceAccount: "YOUR_LINEWORKS_SERVICE_ACCOUNT",
  privateKey: "YOUR_LINEWORKS_PRIVATE_KEY",
}, ["bot"]);

const bot = new Bot(
  "YOUR_BOT_ID",
  "YOUR_BOT_SECRET",
  auth,
);

// send messeage to user
await bot.send("users", "user_id", {
  content: {
    type: "text",
    text: "Bot send message",
  },
});

// send messeage to channel
await bot.send("channels", "channel_id", {
  content: {
    type: "text",
    text: "Bot send message",
  },
});
```

## Echoback (Use Hono)

```typescript
import { Auth, Bot } from "@gazf/deno-lineworks";
import { Hono } from "@hono/hono";

const auth = new Auth({
  clientId: "YOUR_LINEWORKS_CLIENT_ID",
  clientSecret: "YOUR_LINEWORKS_CLIENT_SECRET",
  serviceAccount: "YOUR_LINEWORKS_SERVICE_ACCOUNT",
  privateKey: "YOUR_LINEWORKS_PRIVATE_KEY",
}, ["bot"]);

const bot = new Bot(
  "YOUR_BOT_ID",
  "YOUR_BOT_SECRET",
  auth,
);

// Setup 'MessageCallback'
bot.on("message", async (c) => {
  await c.reply({
    content: {
      type: "text",
      text: `echoback: ${c.e.content.text}`,
    },
  });
});

const app = new Hono();
app.mount("/path/to/callback", bot.fetch);

Deno.serve(app.fetch);
```

## Authors

gazf https://github.com/gazf

## License

Distributed under the MIT License.
