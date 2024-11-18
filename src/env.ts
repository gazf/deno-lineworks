import type { AuthEnv } from "./types.ts";

/** This function reads environment variables using `Deno.env`
 *
 * @example
 * const e = env(["USER", "SHELL"]);
 * console.log(e.USER);
 * console.log(e.SHELL);
 */
export function env<T extends string>(
  keys: T[],
  isAllowUndefined: boolean = false,
) {
  const envs: { [Key in T]?: string } = {};
  keys.forEach((key) => {
    if (!isAllowUndefined && !Deno.env.has(key)) {
      throw new Error(`undefined env "${key}"`);
    }
    envs[key] = Deno.env.get(key);
  });
  return envs as { [Key in T]: string };
}

/** Load default auth env.
 *
 * Internally using `env()`
 *
 * This function is similar to the following code.
 *
 * @example
 * return {
 *   clientId: Deno.env.get("LINEWORKS_CLIENT_ID"),
 *   clientSecret: Deno.env.get("LINEWORKS_CLIENT_SECRET"),
 *   serviceAccount: Deno.env.get("LINEWORKS_SERVICE_ACCOUNT"),
 *   privateKey: Deno.env.get("LINEWORKS_PRIVATE_KEY"),
 * } as AuthEnv;
 */
export function defaultAuthEnv(): AuthEnv {
  const e = env([
    "LINEWORKS_CLIENT_ID",
    "LINEWORKS_CLIENT_SECRET",
    "LINEWORKS_SERVICE_ACCOUNT",
    "LINEWORKS_PRIVATE_KEY",
  ]);
  return {
    clientId: e.LINEWORKS_CLIENT_ID,
    clientSecret: e.LINEWORKS_CLIENT_SECRET,
    serviceAccount: e.LINEWORKS_SERVICE_ACCOUNT,
    privateKey: e.LINEWORKS_PRIVATE_KEY,
  };
}
