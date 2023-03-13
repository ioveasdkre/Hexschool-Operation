// Day 5 - 非同步概念、async await

// https://hackmd.io/p90sW1g0Qa-a_svgZZxIeg

interface IDataModel {
  name: string;
  score: number;
}

// 批改作業
const correctTest5 = (name: string): Promise<IDataModel> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const score: number = Math.round(Math.random() * 100);
      if (score >= 60) {
        resolve({
          name,
          score,
        });
      } else {
        reject(new Error("您已達退學門檻"));
      }
    }, 2000);
  });
};

// 檢查獎勵
const checkReward5 = (data: IDataModel): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.score >= 90) {
        resolve(`${data.name} 獲得電影票`);
      } else if (data.score >= 60 && data.score < 90) {
        resolve(`${data.name} 獲得嘉獎`);
      } else {
        reject(new Error(`您沒有獎品`));
      }
    }, 2000);
  });
};

const init = async (): Promise<void> => {
  try {
    const data: IDataModel = await correctTest5("Benson");
    const reward: string = await checkReward5(data);

    console.log(reward);
  } catch (err: unknown) {
    console.log((err as Error).message);
  }
};

init();