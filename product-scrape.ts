import { App } from "./src/product-scrape.app";

(async () => {
  await new App().executeAsync();
})();
