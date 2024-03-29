// See https://kit.svelte.dev/docs/types#app

import type { User } from "./lib/types/user";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      authedUser: User | undefined;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
