export default async function checkFile(url: string) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    console.log({ response });

    return response.status === 200 || response.status === 405;
  } catch {
    return false;
  }
}
