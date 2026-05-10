import { existsSync } from "node:fs";
import { rm, rename } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const apiPath = path.join(root, "app", "api");
const disabledApiPath = path.join(root, "app", "__api_static_disabled__");
const phpLeadEndpointPath = path.join(root, "out", "api", "lead.php");
const npmCommand = process.platform === "win32" ? "cmd.exe" : "npm";
const npmArgsPrefix = process.platform === "win32" ? ["/d", "/s", "/c", "npm.cmd"] : [];

async function run(command, args, env) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      env,
      stdio: "inherit"
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

  await run(npmCommand, [...npmArgsPrefix, "run", "build"], {
    ...process.env,
    NEXT_OUTPUT: "export",
    NEXT_PUBLIC_STATIC_PREVIEW: "false",
    NEXT_PUBLIC_DISABLE_LOCAL_ANALYTICS: "true",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://auto-drug.online",
    ENABLE_LOCAL_ANALYTICS: "false",
    PRISMA_HIDE_UPDATE_MESSAGE: "1"
  });

  if (!existsSync(phpLeadEndpointPath)) {
    throw new Error("Static build did not include out/api/lead.php");
  }
} finally {
  if (movedApi && existsSync(disabledApiPath)) {
    await rename(disabledApiPath, apiPath);
  }
}

console.log("REG.RU hosting build is ready in ./out");
console.log("Before upload, verify LEADS_EMAIL_TO in public/api/lead.php.");
