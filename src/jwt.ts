import { decodeBase64, encodeBase64 } from "./deps.ts";
import type { AuthEnv } from "./types.ts";

const algorithm = {
  name: "RSASSA-PKCS1-v1_5",
  hash: "SHA-256",
};

function createHeader() {
  return encodeBase64(JSON.stringify({ "alg": "RS256", "typ": "JWT" }));
}

function createPayload(issuer: string, subject: string, timeout = 60): string {
  const timestamp = Math.floor(Date.now() / 1000);
  return encodeBase64(JSON.stringify({
    iss: issuer,
    sub: subject,
    iat: timestamp,
    exp: timestamp + timeout,
  }));
}

function decodePem(pem: string): Uint8Array {
  const header = "-----BEGIN PRIVATE KEY-----";
  const footer = "-----END PRIVATE KEY-----";
  const contents = pem.substring(header.length, pem.length - footer.length);
  return decodeBase64(contents);
}

async function createSignature(
  header: string,
  payload: string,
  privateKey: string,
): Promise<string> {
  const keySource = decodePem(privateKey);
  const key = await crypto.subtle.importKey(
    "pkcs8",
    keySource,
    algorithm,
    false,
    ["sign"],
  ).catch((_) => {
    throw new Error("Import private key error");
  });
  const data = new TextEncoder().encode(`${header}.${payload}`);
  const buf = await crypto.subtle.sign(algorithm, key, data).catch((_) => {
    throw new Error("Sign error");
  });
  return encodeBase64(buf);
}

export async function createJWT(env: AuthEnv) {
  const header = createHeader();
  const payload = createPayload(env.clientId, env.serviceAccount);
  const signature = await createSignature(header, payload, env.privateKey);
  return `${header}.${payload}.${signature}`;
}
