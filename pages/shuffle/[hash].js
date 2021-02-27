import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../../components/layout'
import {
  Container, InputGroup, FormControl, Button, ListGroup, Row, Col 
} from 'react-bootstrap'
import * as crypto from '../../lib/crypto'

const Hash = () => {
  const router = useRouter()
  // パスパラメータから値を取得
  const { hash } = router.query

  const [result, setResult] = useState([])

  useEffect(() => {
    if (!hash) return
    let decrypted
    try {
      decrypted = crypto.getDecryptedString(hash)
    } catch (error) {
      return console.log(error)
    }
    const resultObject = JSON.parse(decrypted)
    setResult(resultObject)
  }, [hash])

  const hostPath = e => {
    return `${location.protocol}//${location.hostname}/shuffle/`
  }

  const handleShuffleLink = e => {
    e.preventDefault()

    router.push(`/shuffle`)
  }

  return (
    <Layout title="組み合わせページ">
      <h1 className="h1">組み合わせページ</h1>
      {result.length < 1 ? (
        <Container fluid className="text-center">
          <p>※ ページは存在しないか、期限切れで削除されています。</p>
          <div className="text-center my-3">
            <Button variant='outline-secondary' onClick={handleShuffleLink}>
              シャッフルやり直す
            </Button>
          </div>
        </Container>
      ) : (<></>)}
      <Container fluid>
        {result.map((person, index) => (
          <Row key={index} className="mb-2 border-bottom">
            <Col xs={2} className="bg-info text-white text-center">{index + 1}組</Col>
            <Col>{person.person1}</Col>
            <Col xs={1}><i className="bi bi-arrow-left-right"></i></Col>
            <Col>{person.person2}</Col>
          </Row>
        ))}
        {result.length > 0 ? (
          <>
            <div className="mt-4 p-3 border rounded">
              <h5 className="border-bottom">共有URL</h5>
              <InputGroup className="my-3">
                <FormControl
                  readOnly
                  value={`${hostPath()}${hash}`}
                />
                <InputGroup.Append>
                  <Button variant="outline-secondary">コピー</Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
            <div className="text-center my-3">
              <Button variant='outline-secondary' onClick={handleShuffleLink}>
                シャッフルやり直す
              </Button>
            </div>
          </>
        ) : (<></>)}
      </Container>
    </Layout>
  )
}

export default Hash
