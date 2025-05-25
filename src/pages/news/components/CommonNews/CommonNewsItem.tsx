import styles from './CommonNews.module.css';
import type { News } from '../../types/News';

interface CommonNewsItemProps {
  newsItem: News;
}

export default function CommonNewsItem({ newsItem }: CommonNewsItemProps) {
  return (
    <article className={styles.newsItem}>
      <a href={newsItem.url} target="_blank" rel="noopener noreferrer" aria-label={newsItem.title}>
        <figure>
          <img
            src={newsItem.thumbnail}
            loading="lazy"
            decoding="async"
            alt={`${newsItem.title} 이미지`}
            width={500}
            height={500}
          />
        </figure>
        <div>
          <h2>{newsItem.title}</h2>
          <h3>{newsItem.subTitle}</h3>
          <p>{newsItem.summary}...</p>
          <time>{new Date(newsItem.createTime).toLocaleDateString()}</time>
        </div>
      </a>
    </article>
  );
}
