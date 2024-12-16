import type { AuthCredential } from "./types.ts";

/** Default bindings the environment valiables */
export const DEFAULT_CREDENTIAL_BINDINGS: AuthCredential = {
  clientId: "LINEWORKS_CLIENT_ID",
  clientSecret: "LINEWORKS_CLIENT_SECRET",
  serviceAccount: "LINEWORKS_SERVICE_ACCOUNT",
  privateKey: "LINEWORKS_PRIVATE_KEY",
} as const;

/** This function reads environment variables using `Deno.env.get()`
 * @param bindings Environment variable key/value pairs.
 * @param [allowUndefined=false] If false(default), an exception is raised when the environment variable is undefined.
 * @example
 * ```ts
 * const bidings = {
 *   user: "USER",
 *   shell: "SHELL"
 * } as const;
 *
 * const e = bind(bindings);
 * console.log(e.user); // == console.log(Deno.env.get("USER"));
 * console.log(e.shell); // == console.log(Deno.env.get("SHELL"));
 * ```
 */
export function bind<const T extends { readonly [key: string]: string }>(
  bindings: T,
  allowUndefined: boolean = false,
): { [P in keyof T]: string } {
  const rawEnv = Deno.env.toObject();
  return Object.keys(bindings).reduce((acc, key) => {
    if (!allowUndefined && rawEnv[bindings[key]] === undefined) {
      throw new ReferenceError(
        `Environment variable "${bindings[key]}" is not defined.`,
      );
    }
    acc[key as keyof T] = rawEnv[bindings[key]];
    return acc;
  }, {} as { [P in keyof T]: string });
}
