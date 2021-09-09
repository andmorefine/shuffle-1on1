import Layout from '../components/layout'
import { Container, Button } from 'react-bootstrap'

export default function Home() {
  return (
    <>
      <Layout>
        <Container>
          <h1 className="h1">シャッフル1on1</h1>
          <div className="d-flex justify-content-center mt-2">
            <div className="text-center m-3">
              <Button href="/shuffle" variant="outline-secondary">
                ゲスト
              </Button>
            </div>
            <div className="text-center m-3">
              <Button href="/rooms" variant="outline-info">
                ルーム
              </Button>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  )
}
