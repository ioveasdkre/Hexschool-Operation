// Day 2 - 非同步概念、使用 Promise

// https://hackmd.io/bLZ9lp32Q0aRHE2EHq9DYA

interface dataModel {
  name: string;
  score: number;
}

// 批改作業
function correctTest(name: string): Promise<dataModel> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const score = Math.round(Math.random() * 100);
      if (score >= 20) {
        resolve({
          name,
          score,
        });
      } else {
        reject("您已達退學門檻");
      }
    }, 2000);
  });
}
// 檢查獎勵
function checkReward(data: dataModel) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.score >= 90) {
        resolve(`${data.name} 獲得電影票`);
      } else if (data.score >= 60 && data.score < 90) {
        resolve(`${data.name} 獲得嘉獎`);
      } else {
        reject(`您沒有獎品`);
      }
    }, 2000);
  });
}

// 執行函式
correctTest("Benson")
  .then((data) => checkReward(data))
  .then((reward) => console.log(reward))
  .catch((err) => console.log(err));
