const encoder = new TextEncoder();

function validateArray(value: unknown): Uint8Array {
  if (typeof value === "string") {
    return encoder.encode(value);
  }
  if (value instanceof Uint8Array) {
    return value;
  }
  if (value instanceof ArrayBuffer) {
    return new Uint8Array(value);
  }
  throw new TypeError();
}

export function encodeBase64(data: string | Uint8Array | ArrayBuffer): string {
  const array = validateArray(data);

  const c = array.length - (array.length % 8);
  let bin: string = "";
  for (let i = 0; i < c;) {
    bin += String.fromCharCode(
      array[i++],
      array[i++],
      array[i++],
      array[i++],
      array[i++],
      array[i++],
      array[i++],
      array[i++],
    );
  }
  for (let i = c; i < array.length; i++) {
    bin += String.fromCharCode(array[i]);
  }

  return btoa(bin);
}

export function decodeBase64(base64: string): Uint8Array {
  const bin = atob(base64);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < buf.length; i++) {
    buf[i] = bin.charCodeAt(i);
  }

  return buf;
}
