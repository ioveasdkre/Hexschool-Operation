import bcrypt from "bcryptjs";

const saltRounds = 12;

// 加密密碼
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

// 驗證密碼
const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};

export { hashPassword, verifyPassword };
