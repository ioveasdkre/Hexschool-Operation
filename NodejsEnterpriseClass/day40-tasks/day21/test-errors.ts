// 未捕捉到的 catch
function throwUnhandledRejection() {
  return Promise.reject(new Error("This is an unhandled rejection!")); // 這會觸發 unhandledRejection
}

export { throwUnhandledRejection };
