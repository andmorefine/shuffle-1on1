import Link from 'next/link'
import Layout from '../../components/layout'
import { Container, Nav, Navbar } from 'react-bootstrap';

const ResultIndex = ({ posts }) => {
  return (
    <Layout title="結果">
      <h1 className="h1">結果</h1>
      <Container>
      </Container>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const posts = ''
  return { props: { posts } }
}

export default ResultIndex
