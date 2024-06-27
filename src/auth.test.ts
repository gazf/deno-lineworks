import { assertEquals } from "@std/assert";
import { stub } from "@std/testing/mock";
import { testEnv } from "./testdata/test.env.ts";

import { Auth, type Scope } from "./mod.ts";

Deno.test("Auth Class test", async (t) => {
  const scopes: Scope[] = ["bot", "bot.read"];
  const auth = new Auth(testEnv, scopes);

  const mockAccessToken = {
    access_token: "DAMMY_ACCESS_TOKEN",
    refresh_token: "DAMMY_REFRESH_TOKEN",
    scope: scopes.join(" "),
    token_type: "Bearer",
    expires_in: "86400",
  };

  await t.step({
    name: "Auth.fetchAccessToken() (from edge)",
    async fn() {
      const fetchStub = stub(
        globalThis,
        "fetch",
        () =>
          Promise.resolve(
            new Response(
              JSON.stringify(mockAccessToken),
            ),
          ),
      );

      try {
        const token = await auth.fetchAccessToken();
        assertEquals(token, mockAccessToken.access_token);
        assertEquals(auth.context?.scopes, scopes);
      } finally {
        fetchStub.restore();
      }
    },
  });

  await t.step({
    name: "Auth.includeScopes()",
    fn() {
      assertEquals(auth.includeScopes(scopes), true);
      assertEquals(auth.includeScopes(["calendar", "calendar.read"]), false);
      assertEquals(auth.includeScopes(["calendar", "bot"]), false);
      assertEquals(auth.includeScopes(["calendar", ...scopes]), false);
      assertEquals(auth.includeScopes(["bot"]), true);
    },
  });

  await t.step({
    name: "Auth.fetchAccessToken() (from cache)",
    async fn() {
      const token = await auth.fetchAccessToken();
      assertEquals(token, mockAccessToken.access_token);
      assertEquals(auth.context?.scopes, scopes);
    },
  });

  await t.step({
    name: "Auth.rovokeToken()",
    async fn() {
      const fetchStub = stub(
        globalThis,
        "fetch",
        () => Promise.resolve(new Response()),
      );

      try {
        const r = await auth.revokeToken();
        assertEquals(r?.ok, true);
        assertEquals(auth.context, undefined);

        const _ = await r?.text();
      } finally {
        fetchStub.restore();
      }
    },
  });
});
