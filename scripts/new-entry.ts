import { readdirSync } from "node:fs";
import { input, search } from "@inquirer/prompts";

const categories = readdirSync("src/content", { withFileTypes: true })
  .filter((file) => file.isDirectory())
  .map((file) => file.name.replace("-", " "));

process.on("uncaughtException", (error) => {
  if (error instanceof Error && error.name === "ExitPromptError") {
    console.log("✌🏽");
  } else {
    console.log("rethrowing");
    throw error;
  }
});

function normalizeUrl(input: string) {
  // Trim whitespace
  let url = input.trim();

  // If it doesn't start with http:// or https://, add https://
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  try {
    return new URL(url).href;
  } catch {
    return null;
  }
}

function frontMatterDate(date: Date | undefined) {
  if (!date) return "";
  const rawMonth = date.getMonth() + 1;
  const month = rawMonth < 10 ? `0${rawMonth}` : rawMonth;

  const rawDay = date.getDate() + 1;
  const day = rawDay < 10 ? `0${rawDay}` : rawDay;

  return `${date.getFullYear()}-${month}-${day}`;
}

const createPost = async () => {
  let category: string = await search({
    message: "category?",
    source: () => categories.concat("new..."),
  });
  if (category === "new...") {
    category = await input({ message: "new category title?" });
  }

  const isAward = category === "awards";

  const company = await input({
    message: "company/project name?",
  });

  const slug = company.toLowerCase().replace(/\s+/g, "-");

  const role = await input({
    message: isAward ? "award title?" : "role?",
  });

  const url = normalizeUrl(
    await input({
      message: isAward ? "award url?" : "company url?",
    })
  );

  const startDate = new Date(
    await input({
      message: "start date?",
    })
  );

  let endDate: Date | undefined;
  if (!isAward) {
    endDate = new Date(
      await input({
        message: "end date?",
      })
    );
    if (Number.isNaN(endDate.getDate())) {
      endDate = undefined;
    }
  }

  const required = [category, company, role, startDate];
  for (const variable of required) {
    if (!variable) {
      throw new Error(
        "missing required value. must enter category, company, role, and start date."
      );
    }
  }

  const post = `---
company: "${company}"
url: ${url ? url : ""}
role: "${role}"
startdate: ${frontMatterDate(startDate)}
enddate: ${frontMatterDate(endDate)}
---


`;

  const postPath = Bun.file(
    `src/content/${category.toLowerCase().replace(" ", "-")}/${slug}.md`
  );
  Bun.write(postPath, post, { createPath: true });

  console.log(`post created at ${postPath.name}`);
};

try {
  console.warn(
    "i don't recommend using this script right now. it SHOULD work, however it's somewhat prone to issues."
  );
  await createPost();
} catch (error) {
  if (error instanceof Error && error.name === "ExitPromptError") {
    console.log("bye!");
  } else {
    console.log("rethrowing");
    throw error;
  }
}
