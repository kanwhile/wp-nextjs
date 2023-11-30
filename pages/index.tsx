import Head from 'next/head';
import { GetStaticProps } from 'next';
import Container from '../components/container';
import MoreStories from '../components/more';
import Hero from '../components/hero';
import Intro from '../components/intro';
import Layout from '../components/layout';
import { getAllPostsForHome } from '../lib/api';
import { SITE_NAME } from '../lib/constants';
import Link from 'next/link';

export default function Index({ allPosts, preview }) {
  const morePosts = allPosts;
  console.log(preview);

  return (
    <Layout preview={preview}>
      <Head>
        <title>{SITE_NAME}</title>
      </Head>
      <Container>
        <Intro />
        { morePosts.map((item) => (
          <Link href={`/posts/${item.slug}`} >
            {item.title.rendered}
            </Link>
        ))}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const variableName = await fetch('https://gun.todsorb.dev/wp-json/wp/v2/posts?_embed&order=desc&per_page=100&status=publish')
   const allPosts = await variableName.json()
   console.log(allPosts)
   return {
    props: { allPosts ,preview},
    revalidate: 10,
   }
};
