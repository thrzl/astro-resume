import puppeteer from "puppeteer";
import yoctoSpinner from "yocto-spinner";

const fileHandler = Bun.file("dist/index.html");
const outFile = Bun.file("output.pdf");

if (await outFile.exists()) {
  outFile.delete();
}

const fileContent = await fileHandler.text();

const spinner = yoctoSpinner({ text: "generating pdf…" }).start();
const browser = await puppeteer.launch({
  headless: "shell",
  args: [
    // you trust me, right ;)
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-web-security",
    "--disable-extensions",
    "--disable-plugins",
  ],
});

const page = await browser.newPage();
page.setJavaScriptEnabled(false);
await page.setViewport({
  width: 3840,
  height: 2560,
});
await page.setContent(fileContent.toString());
const pdf = await page.pdf({
  format: "A4",
  margin: { top: "1in", bottom: "1in" },
});
await browser.close();

Bun.write(Bun.file("output.pdf"), pdf);
spinner.success("all done! check output.pdf :P");
