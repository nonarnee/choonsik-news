export interface News {
  title: string;
  subTitle: string;
  summary: string;
  createTime: number;
  thumbnail: string;
  url: string;
}

export interface NewsData {
  headlineNews: News[];
  commonNews: News[];
}
