import { createHooks } from "hookable";

export interface MyHooks {
  "sse:event": (data: any) => any | void;
}

export const myHooks = createHooks<MyHooks>();
