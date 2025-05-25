import Carousel from '@/components/Carousel';

import styles from './HeadlineNews.module.css';
import newsData from '../../mocks/newsData.json';

export default function HeadlineNews() {
  const headlineSlides = newsData.headlineNews.map((news) => (
    <a
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      key={news.title}
      className={styles.headlineNews}
    >
      <article>
        <figure>
          <img
            src={news.thumbnail}
            alt={`${news.title} 이미지`}
            loading="eager"
            decoding="async"
            width={500}
            height={500}
          />
        </figure>
        <div>
          <h2>{news.title}</h2>
          <h3>{news.subTitle}</h3>
        </div>
      </article>
    </a>
  ));

  return (
    <section className={styles.container}>
      <Carousel slides={headlineSlides} autoPlay />
    </section>
  );
}
