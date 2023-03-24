interface IPost {
  title: string;
  author: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export { IPost };
