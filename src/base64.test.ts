import {
  assertEquals,
  decodeBase64 as stdDecodeBase64,
  encodeBase64 as stdEncodeBase64,
} from "./deps-test.ts";
import { base64data, textdata } from "./testdata/test.base64.ts";
import { decodeBase64, encodeBase64 } from "./base64.ts";

Deno.test({
  name: "encodeBase64 Test",
  fn() {
    for (const str of textdata) {
      const stdEn = stdEncodeBase64(str);
      const en = encodeBase64(str);
      assertEquals(en, stdEn);
    }
  },
});

Deno.test({
  name: "decodeBase64 Test",
  fn() {
    for (const base64 of base64data) {
      const stdDe = stdDecodeBase64(base64);
      const de = decodeBase64(base64);
      assertEquals(stdDe, de);
    }
  },
});
