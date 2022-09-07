import { GetStaticProps } from 'next';
import Link from 'next/dist/client/link';
import SEO from '../../components/SEO';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import styles from './posts.module.sass';

interface Post {
  slug: string;
  title: string;
  image: string;
  excerpt: string;
  updateAt: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <SEO title="Posts" />
      <main className={styles.container}>
        <section className={styles.posts}>
          {posts.map(post => (
            <Link href="#" key={post.slug}>
              <a>
                <img src={post.image} alt={post.title} />
                <br />
                <time>{post.updateAt}</time>
                <h3>
                  <strong>{post.title}</strong>
                </h3>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.content', 'post.image'],
    },
  );
  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      image: post.data.image.url,
      excerpt:
        post.data.content.find(content => content.type === 'paragraph')?.text ??
        '',
      updateAt: new Date(post.last_publication_date).toLocaleString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 12,
  };
};
