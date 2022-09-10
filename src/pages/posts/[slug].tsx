import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import Link from 'next/dist/client/link';
import SEO from '../../components/SEO';
import styles from './post.module.sass';
import { useRouter } from 'next/router';

interface PostRecent {
  title: string;
  excerpt: string;
  slug: string;
  image: string;
}

interface PostsPropsRecents {
  posts: PostRecent[];
  post: {
    slug: string;
    title: string;
    image: string;
    content: string;
    excerpt: string;
    updateAt: string;
  };
}

export default function Post({ post, posts }: PostsPropsRecents) {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Carregando...</p>;
  }
  return (
    <>
      <SEO title="Post" />
      {post && (
        <main className={styles.container}>
          <article className={styles.post}>
            <Link href="/posts">
              <a>↩ Voltar</a>
            </Link>
            <h1>{post.title}</h1>
            <img src={post.image} alt={post.title} />
            <time>{post.updateAt}</time>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
          <div className={styles.postsRecents}>
            <h3>Publicações Recentes</h3>
            <aside>
              {posts &&
                posts.map(
                  (post, index) =>
                    index < 6 && (
                      <Link href={`/posts/${post.slug}`} key={post.slug}>
                        <a className={styles.postsRecentsContent}>
                          <img src={post.image} alt={post.title} />
                          <div>
                            <h6>
                              <strong>{post.title}</strong>
                            </h6>
                            <p>{post.excerpt.slice(0, 85)}...</p>
                          </div>
                        </a>
                      </Link>
                    ),
                )}
            </aside>
          </div>
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
  const responseRecents = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.content', 'post.image'],
    },
  );
  const posts = responseRecents.results.map(post => {
    return {
      title: RichText.asText(post.data.title),
      image: post.data.image.url,
      excerpt:
        post.data.content.find(content => content.type === 'paragraph')?.text ??
        '',
      slug: post.uid,
    };
  });

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    image: response.data.image.url,
    content: RichText.asHtml(response.data.content),
    excerpt:
      response.data.content.find(
        (content: { type: string }) => content.type === 'paragraph',
      )?.text ?? '',
    updateAt: new Date(response.last_publication_date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  };

  if (!response) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      posts,
    },
    revalidate: 60 * 60 * 12, //12horas
  };
};
