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
        <section className={styles.containerHeader}>
          <div className={styles.headerLeft}>
            <img src="rocket.svg" alt="" />
          </div>
          <div className={styles.headerRight}>
            <h1>
              Há conhecimento de dois tipos: <span>sabemos sobre</span> um
              assunto, ou sabemos onde <span>podemos buscar</span> informação
              sobre ele
            </h1>
            <p>
              Material selecionado com os assuntos mais relevantes para
              alavancar o seu conhecimento. <br />O Blog Dev tem o prazer em te
              ajudar a ser um programdor melhor, absorva nosso conteúdo sem
              moderação.
            </p>
          </div>
        </section>
        <h2>Publicações</h2>
        <section className={styles.containerPosts}>
          <div className={styles.posts}>
            {posts.map(post => (
              <Link href={`/posts/${post.slug}`} key={post.slug}>
                <a className={styles.singlePost}>
                  <img src={post.image} alt={post.title} />
                  <div>
                    <time>{post.updateAt}</time>
                    <h3>
                      <strong>{post.title}</strong>
                    </h3>
                    <p>{post.excerpt.slice(0, 140)}...</p>
                  </div>
                </a>
              </Link>
            ))}
          </div>
          <div className={styles.postsRecents}>
            <h3>Publicações Recentes</h3>
            <aside>
              {posts.map(
                (post, index) =>
                  index < 5 && (
                    <Link href={`/posts/${post.slug}`} key={post.slug}>
                      <a className={styles.postsRecentsContent}>
                        <img src={post.image} alt={post.title} />
                        <div>
                          <h6>
                            <strong>{post.title}</strong>
                          </h6>
                          <p>{post.excerpt.slice(0, 35)}...</p>
                        </div>
                      </a>
                    </Link>
                  ),
              )}
            </aside>
          </div>
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
    revalidate: 60 * 60 * 12, //12horas
  };
};
