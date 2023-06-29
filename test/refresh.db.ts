import { execSync } from "child_process";

export const refreshDB = () => {
  return new Promise((resolve, reject) => {
    try {
      execSync("npx prisma migrate reset --force");
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};
