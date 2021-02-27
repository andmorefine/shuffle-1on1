import Link from 'next/link'
import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Home() {
  return (
    <Layout>

      <Container>
        <h1 className="h1">シャッフル1on1</h1>
        <div className="d-flex justify-content-center">
          <div className="text-center">
            <Link href="/shuffle">
              <a className="list-group-item list-group-item-action">スタート</a>
            </Link>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
