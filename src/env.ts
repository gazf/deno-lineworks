import type { AuthEnv } from "./types.ts";

/** This function reads environment variables using `Deno.env.get()`
 * @param keys Environment variable key names.
 * @param [allowUndefined=false] If false(default), an exception is raised when the environment variable is undefined.
 * @example
 * const e = env(["USER", "SHELL"]);
 * console.log(e.USER);
 * console.log(e.SHELL);
 */
export function env<const T extends readonly string[]>(
  keys: T,
  allowUndefined: boolean = false,
): {
  [Key in T[number]]: string
} {
  const rawEnv = Deno.env.toObject();
  return keys.reduce((acc, key: T[number]) => {
    if (!allowUndefined && rawEnv[key] === undefined) {
      throw new ReferenceError(`Environment variable "${key}" is not defined.`);
    }
    acc[key] = rawEnv[key];
    return acc;
  }, {} as {[Key in T[number]]: string} );
}

/** Load default auth env.
 *
 * Internally using `env()`
 *
 * This function is similar to the following code.
 *
 * ```ts
 * return {
 *   clientId: Deno.env.get("LINEWORKS_CLIENT_ID"),
 *   clientSecret: Deno.env.get("LINEWORKS_CLIENT_SECRET"),
 *   serviceAccount: Deno.env.get("LINEWORKS_SERVICE_ACCOUNT"),
 *   privateKey: Deno.env.get("LINEWORKS_PRIVATE_KEY"),
 * } as AuthEnv;
 * ```
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
