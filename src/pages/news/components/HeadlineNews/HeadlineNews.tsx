import Carousel from '@/components/Carousel';

import styles from './HeadlineNews.module.css';
import HeadlineNewsItem from './HeadlineNewsItem';
import newsData from '../../mocks/newsData.json';

export default function HeadlineNews() {
  const headlineSlides = newsData.headlineNews.map((news) => (
    <HeadlineNewsItem key={news.url} news={news} />
  ));

  return (
    <section className={styles.container}>
      <Carousel slides={headlineSlides} autoPlay />
    </section>
  );
}
