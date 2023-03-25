interface IPost {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  tags: string[];
  imageUrl: string;
}

export { IPost };
