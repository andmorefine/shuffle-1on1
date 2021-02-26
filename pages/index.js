import Link from 'next/link'
import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Home() {
  return (
    <Layout>

      <Container>
        <h1 className="h1">シャッフル1on1</h1>
        <Row>
          <Col sm={4} md={3}>
            <Card>
              <Link href="/result">
                <a className="list-group-item list-group-item-action">シャッフル1on1</a>
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
