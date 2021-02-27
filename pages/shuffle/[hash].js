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
  return (
    <Layout title="結果">
      <h1 className="h1">結果</h1>
      <Container fluid>
      {hash}
      </Container>
    </Layout>
  )
}

export default Hash
