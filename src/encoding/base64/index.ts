import atob from "atob";
import btoa from "btoa";

export class Base64 {
  static encode(string: string): string {
    return btoa(string);
  }

  static decode(string: string): string {
    return atob(string);
  }
}
