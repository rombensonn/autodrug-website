import { existsSync } from "node:fs";
import { rm, rename } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const apiPath = path.join(root, "app", "api");
const disabledApiPath = path.join(root, "app", "__api_static_disabled__");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

async function run(command, args, env) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      env,
      stdio: "inherit",
      shell: process.platform === "win32"
    });

    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
    });
    child.on("error", reject);
  });
}

await rm(disabledApiPath, { recursive: true, force: true });

let movedApi = false;
try {
  await rm(path.join(root, ".next"), { recursive: true, force: true });
  await rm(path.join(root, "out"), { recursive: true, force: true });

  if (existsSync(apiPath)) {
    await rename(apiPath, disabledApiPath);
    movedApi = true;
  }

  await run(npmCommand, ["run", "build"], {
    ...process.env,
    NEXT_PUBLIC_STATIC_PREVIEW: "true",
    NEXT_PUBLIC_GITHUB_PAGES_REPOSITORY:
      process.env.NEXT_PUBLIC_GITHUB_PAGES_REPOSITORY || "autodrug-website",
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://rombensonn.github.io/autodrug-website",
    NEXT_PUBLIC_ENABLE_YANDEX_METRICA: "false",
    ENABLE_LOCAL_ANALYTICS: "false"
  });
} finally {
  if (movedApi && existsSync(disabledApiPath)) {
    await rename(disabledApiPath, apiPath);
  }
}
