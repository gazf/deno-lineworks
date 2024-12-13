import { assertEquals, stub } from "./deps-test.ts";
import {
  mockFileMessageCallbackEvent,
  mockImageMessageCallbackEvent,
  mockJoinCallbackEvent,
  mockJoinedCallbackEvent,
  mockLeaveCallbackEvent,
  mockLeftCallbackEvent,
  mockLocationMessageCallbackEvent,
  mockStickerMessageCallbackEvent,
  mockTextMessageCallbackEvent,
} from "./testdata/test.bot.ts";

import {
  type AuthInterface,
  Bot,
  type CallbackEvent,
  type TextMessage,
} from "../mod.ts";
import { encodeBase64 } from "../base64.ts";

const createSignature = async (secret: string, body: string) => {
  const encoder = new TextEncoder();
  const keyBuffer = encoder.encode(secret);
  const key = crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign"],
  );

  const bodyBuffer = encoder.encode(body);
  const hmac = await crypto.subtle.sign("HMAC", await key, bodyBuffer.buffer);
  return encodeBase64(hmac);
};

const botId = "1111111111";
const botSecret = "abcdefghij";

const mockAuth: AuthInterface = {
  fetchAccessToken: () =>
    new Promise((resolve) => {
      resolve("DAMMY_ACCESS_TOKEN");
    }),
  includeScopes: () => true,
};

Deno.test("Bot Class Send test", async (t) => {
  const bot = new Bot(botId, botSecret, mockAuth);

  await t.step({
    name: "Bot.send() users",
    async fn() {
      const fetchStub = stub(
        globalThis,
        "fetch",
        () => Promise.resolve(new Response("", { status: 200 })),
      );

      try {
        const r = await bot.send("users", "TO", {
          content: {
            type: "text",
            text: "TEXT",
          },
        });

        assertEquals(r.ok, true);
      } finally {
        fetchStub.restore();
      }
    },
  });

  await t.step({
    name: "Bot.send() channels",
    async fn() {
      const fetchStub = stub(
        globalThis,
        "fetch",
        () => Promise.resolve(new Response("", { status: 200 })),
      );

      try {
        const r = await bot.send("channels", "TO", {
          content: {
            type: "text",
            text: "TEXT",
          },
        });

        assertEquals(r.ok, true);
      } finally {
        fetchStub.restore();
      }
    },
  });
});

Deno.test("Bot Class Callback test", async (t) => {
  const createRequest = async (e: CallbackEvent) => {
    const body = JSON.stringify(e);
    return new Request("https://hogehoge.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WORKS-BotId": botId,
        "X-WORKS-Signature": await createSignature(botSecret, body),
      },
      body: body,
    });
  };

  const fetchStub = stub(
    globalThis,
    "fetch",
    () => Promise.resolve(new Response("", { status: 200 })),
  );

  try {
    const bot = new Bot(botId, botSecret, mockAuth);
    const message: TextMessage = {
      content: { type: "text", text: "HOGE" },
    };

    bot.on("message", (c) => {
      switch (c.event.content.type) {
        case "text":
          assertEquals(c.event, mockTextMessageCallbackEvent);
          assertEquals(c.reply(message), {
            destination: c.by(),
            to: c.id(),
            message: message,
          });
          break;
        case "image":
          assertEquals(c.event, mockImageMessageCallbackEvent);
          assertEquals(c.reply(message), {
            destination: c.by(),
            to: c.id(),
            message: message,
          });
          break;
        case "sticker":
          assertEquals(c.event, mockStickerMessageCallbackEvent);
          assertEquals(c.reply(message), {
            destination: c.by(),
            to: c.id(),
            message: message,
          });
          break;
        case "location":
          assertEquals(c.event, mockLocationMessageCallbackEvent);
          assertEquals(c.reply(message), {
            destination: c.by(),
            to: c.id(),
            message: message,
          });
          break;
        case "file":
          assertEquals(c.event, mockFileMessageCallbackEvent);
          assertEquals(c.reply(message), {
            destination: c.by(),
            to: c.id(),
            message: message,
          });
          break;
      }
    });

    bot.on("join", (c) => {
      assertEquals(c.event, mockJoinCallbackEvent);
      assertEquals(c.reply(message), {
        destination: c.by(),
        to: c.id(),
        message: message,
      });
    });
    bot.on("leave", (c) => {
      assertEquals(c.event, mockLeaveCallbackEvent);
      assertEquals(c.reply(message), {
        destination: c.by(),
        to: c.id(),
        message: message,
      });
    });
    bot.on("joined", (c) => {
      assertEquals(c.event, mockJoinedCallbackEvent);
      assertEquals(c.reply(message), {
        destination: c.by(),
        to: c.id(),
        message: message,
      });
    });
    bot.on("left", (c) => {
      assertEquals(c.event, mockLeftCallbackEvent);
      assertEquals(c.reply(message), {
        destination: c.by(),
        to: c.id(),
        message: message,
      });
    });

    await t.step({
      name: "Bot.fetch TextMessageCallbackEvent",
      async fn() {
        const r = await bot.fetch(
          await createRequest(mockTextMessageCallbackEvent),
        );
        assertEquals(r.ok, true);
      },
    });

    await t.step({
      name: "Bot.fetch LocationMessageCallbackEvent",
      async fn() {
        const r = await bot.fetch(
          await createRequest(mockLocationMessageCallbackEvent),
        );
        assertEquals(r.ok, true);
      },
    });

    await t.step({
      name: "Bot.fetch StickerMessageCallbackEvent",
      async fn() {
        const r = await bot.fetch(
          await createRequest(mockStickerMessageCallbackEvent),
        );
        assertEquals(r.ok, true);
      },
    });

    await t.step({
      name: "Bot.fetch ImageMessageCallbackEvent",
      async fn() {
        const r = await bot.fetch(
          await createRequest(mockImageMessageCallbackEvent),
        );
        assertEquals(r.ok, true);
      },
    });

    await t.step({
      name: "Bot.fetch FileMessageCallbackEvent",
      async fn() {
        const r = await bot.fetch(
          await createRequest(mockFileMessageCallbackEvent),
        );
        assertEquals(r.ok, true);
      },
    });

    await t.step({
      name: "Bot.fetch JoinCallbackEvent",
      async fn() {
        const r = await bot.fetch(await createRequest(mockJoinCallbackEvent));
        assertEquals(r.ok, true);
      },
    });
    await t.step({
      name: "Bot.fetch LeaveCallbackEvent",
      async fn() {
        const r = await bot.fetch(await createRequest(mockLeaveCallbackEvent));
        assertEquals(r.ok, true);
      },
    });
    await t.step({
      name: "Bot.fetch JoinedCallbackEvent",
      async fn() {
        const r = await bot.fetch(await createRequest(mockJoinedCallbackEvent));
        assertEquals(r.ok, true);
      },
    });
    await t.step({
      name: "Bot.fetch LeftCallbackEvent",
      async fn() {
        const r = await bot.fetch(await createRequest(mockLeftCallbackEvent));
        assertEquals(r.ok, true);
      },
    });
  } finally {
    fetchStub.restore();
  }
});
