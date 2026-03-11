import checkFile from "./check-file";

export default async function allAvailableFiles(urls: string[]) {
  const availabilityResults = await Promise.all(
    urls.map((url) => checkFile(url))
  );

  return !availabilityResults.includes(false);
}
