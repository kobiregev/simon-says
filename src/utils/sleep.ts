export default function (ms: number = 0) {
  let timeout: ReturnType<typeof setTimeout>;
  return new Promise<void>(
    resolve =>
      (timeout = setTimeout(() => {
        resolve();
      }, ms)),
  )
    .catch(() => {
      clearTimeout(timeout);
    })
    .then(() => {
      clearTimeout(timeout);
    })
    .finally(() => {
      clearTimeout(timeout);
    });
}
