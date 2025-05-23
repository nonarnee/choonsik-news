import { CommonNews } from './components/CommonNews';
import { HeadlineNews } from './components/HeadlineNews';
import NewsHeader from './components/NewsHeader/NewsHeader';

export default function NewsPage() {
  return (
    <main>
      <NewsHeader />
      <HeadlineNews />
      <CommonNews />
    </main>
  );
}
