import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';
import SEO from '../../components/SEO';
import styles from './post.module.sass';

interface PostProps {
  post: {
    slug: string;
    title: string;
    image: string;
    content: string;
    updateAt: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <SEO title="Post" />
      {post && (
        <main className={styles.container}>
          <article className={styles.post}>
            <h1>{post.title}</h1>
            <img src={post.image} alt={post.title} />
            <time>{post.updateAt}</time>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </main>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async context => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    image: response.data.image.url,
    content: RichText.asText(response.data.content),
    updateAt: new Date(response.last_publication_date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 12, //12horas
  };
};
