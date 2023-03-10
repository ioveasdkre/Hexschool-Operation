// Day 1 - 非同步概念、建立 Promise

// https://hackmd.io/grmV5W6IQ5KRT4ranuW3Fw?view

const checkScore = () => {
  return new Promise((resolve, reject) => {
    /* 回傳一個 Promise，並執行以下非同步操作*/
    const score = Math.round(Math.random() * 100);

    setTimeout(() => {
      if (score >= 60) {
        resolve(score); // 執行實現方法
      } else {
        reject(score); // 執行拒絕方法
      }
    }, 1000);
  });
};

checkScore()
  .then((score) => console.log(`${score}分，及格`))
  .catch((err) => console.log(`${err}分，不及格`));
