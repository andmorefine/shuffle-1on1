import axios from 'axios'
import { createClient } from 'microcms-js-sdk'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../../components/layout'
import { Container, Button, Row, Col, Card } from 'react-bootstrap'

// Initialize Client SDK.
const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_DOMAIN,
  apiKey: process.env.NEXT_PUBLIC_X_API_KEY,
})

const config = {
  headers: {
    'X-WRITE-API-KEY': process.env.NEXT_PUBLIC_X_WRITE_API_KEY,
    'Content-Type': 'application/json',
  },
}
const url = `https://${process.env.NEXT_PUBLIC_DOMAIN}.microcms.io/api/v1/shuffle_rooms`

const RoomIndex = () => {
  const router = useRouter()
  const [rooms, setRooms] = useState([])

  const getAllRooms = () => {
    client.get({ endpoint: 'shuffle_rooms' }).then((res) => setRooms(res.contents))
  }

  useEffect(() => {
    getAllRooms()
  }, [])

  const handleAdd = (e) => {
    e.preventDefault()

    router.push(`/rooms/new`)
  }

  const handleDelete = (id, e) => {
    e.preventDefault()

    const res = confirm('削除してもよい？')
    if (res) {
      axios.delete(`${url}/${id}`, config).then((response) => {
        getAllRooms()
      })
    }
  }

  const parse = (e) => {
    return JSON.parse(e).join('、')
  }

  return (
    <Layout title="ルーム">
      <h1 className="h1">ルーム</h1>
      <Container fluid>
        <div className="text-center my-3">
          <Button onClick={handleAdd}>追加</Button>
        </div>

        <Row>
          {rooms.map((room, index) => (
            <Col lg="4" key={index}>
              <Card>
                <Card.Body>
                  <Card.Title>{room.title}</Card.Title>
                  <Card.Subtitle className="mb-1 text-muted">members</Card.Subtitle>
                  <Card.Text>{parse(room.members)}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="info" href={`/rooms/${room.id}`}>
                      シャッフル開始
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={(e) => handleDelete(room.id, e)}>
                      削除
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  )
}

export default RoomIndex
