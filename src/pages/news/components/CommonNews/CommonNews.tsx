import styles from './CommonNews.module.css';
import CommonNewsItem from './CommonNewsItem';
import newsData from '../../mocks/newsData.json';

export default function CommonNews() {
  return (
    <>
      <section className={styles.container}>
        {newsData.commonNews.map((news) => (
          <CommonNewsItem key={news.url} newsItem={news} />
        ))}
      </section>
    </>
  );
}
