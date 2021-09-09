import axios from 'axios'
import { createClient } from 'microcms-js-sdk'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import Layout from '../../../components/layout'
import ButtonLine from '../../../components/button_line'
import { Container, Button, InputGroup, FormControl, Overlay, Tooltip, Row, Col } from 'react-bootstrap'

const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_DOMAIN,
  apiKey: process.env.NEXT_PUBLIC_X_API_KEY,
})

const ShuffleResult = () => {
  const router = useRouter()
  const { id, result_id } = router.query

  const [result, setResult] = useState([])
  const [copySuccess, setCopySuccess] = useState('')
  const [show, setShow] = useState(false)
  const target = useRef(null)

  const handleCopy = (e) => {
    setShow(!show)
    document.getElementById('shareLink').select()
    document.execCommand('copy')
    document.getElementById('shareLink').focus()
    setCopySuccess('Copied!')
  }

  const getResult = () => {
    client.get({ endpoint: `shuffle_resuluts/${result_id}` }).then((res) => {
      setResult(JSON.parse(res.persons))
    })
  }

  useEffect(() => {
    if (!id || !result_id) return

    getResult()
  }, [id, result_id])

  const hostPath = (e) => {
    if (typeof location === 'undefined') return false

    return `${location.protocol}//${location.hostname}/rooms/${id}`
  }

  const handleShuffleLink = (e) => {
    e.preventDefault()

    router.push(`/rooms/${id}`)
  }

  return (
    <Layout title="組み合わせ結果">
      <h1 className="h1">組み合わせ結果</h1>

      <Container>
        {result.map((person, index) => (
          <Row key={index} className="mb-2 border-bottom">
            <Col xs={2} className="bg-info text-white text-center">
              {index + 1}組
            </Col>
            <Col>{person.person1}</Col>
            <Col xs={1}>
              <i className="bi bi-arrow-left-right"></i>
            </Col>
            <Col>{person.person2}</Col>
          </Row>
        ))}
        {result.length > 0 ? (
          <>
            <div className="mt-4 p-3 border rounded">
              <h5 className="border-bottom">共有URL</h5>
              <InputGroup className="my-3">
                <FormControl readOnly id="shareLink" value={`${hostPath()}/${result_id}`} />
                <InputGroup.Append>
                  <Button ref={target} variant="outline-secondary" onClick={handleCopy}>
                    コピー
                  </Button>
                  <Overlay target={target.current} show={show} placement="top">
                    <Tooltip>{copySuccess}</Tooltip>
                  </Overlay>
                </InputGroup.Append>
              </InputGroup>
              <div className="text-end">
                <ButtonLine url={`${hostPath()}/${result_id}`}></ButtonLine>
              </div>
            </div>
            <div className="text-center my-3">
              <Button variant="outline-secondary" onClick={handleShuffleLink}>
                シャッフルやり直す
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}
      </Container>
    </Layout>
  )
}

export default ShuffleResult
