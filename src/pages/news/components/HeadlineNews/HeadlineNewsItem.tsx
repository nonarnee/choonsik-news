import styles from './HeadlineNews.module.css';
import type { News } from '../../types/News';

interface HeadlineNewsItemProps {
  news: News;
}

export default function HeadlineNewsItem({ news }: HeadlineNewsItemProps) {
  return (
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
  );
}
