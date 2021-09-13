import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../../components/layout'
import { Container, Button, InputGroup, FormControl, ListGroup, Form } from 'react-bootstrap'

const config = {
  headers: {
    'X-WRITE-API-KEY': process.env.NEXT_PUBLIC_X_WRITE_API_KEY,
    'Content-Type': 'application/json',
  },
}
const url = `https://${process.env.NEXT_PUBLIC_DOMAIN}.microcms.io/api/v1/shuffle_rooms`

const RoomNew = () => {
  const router = useRouter()
  const [title, setTitle] = useState([])
  const [participant, setParticipant] = useState([])
  const [name, setName] = useState('')

  const handleTilteChange = (e) => {
    setTitle(e.target.value)
  }

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleDelete = (e, index) => {
    e.preventDefault()

    const newParticipant = [...participant]
    newParticipant.splice(index, 1)
    setParticipant(newParticipant)
  }

  const handleClick = (e) => {
    if (!name) return false

    setParticipant([...participant, name])
    setName('')
  }

  const handleOnKeyPress = (e) => {
    if (e.key != 'Enter' || !name) return false

    setParticipant([...participant, name])
    setName('')
  }

  const handleAdd = (e) => {
    e.preventDefault()

    const data = {
      title: title,
      members: JSON.stringify(participant),
    }

    axios.post(url, data, config).then((response) => {
      router.push(`/rooms`)
    })
  }

  return (
    <Layout title="ルーム新規作成">
      <h1 className="h1">ルーム新規作成</h1>

      <Container fluid>
        <h3 className="h3">ルーム名</h3>
        <InputGroup hasValidation>
          <InputGroup.Text>
            <i className="bi bi-house-door-fill"></i>
          </InputGroup.Text>
          <Form.Control type="text" placeholder="精神と時の部屋" value={title} required onChange={handleTilteChange} />
        </InputGroup>
      </Container>

      <Container fluid className="mt-4">
        <h3 className="h3">メンバー</h3>
        <InputGroup className="mb-3">
          <FormControl placeholder="あだ名" value={name} onChange={handleChange} onKeyPress={handleOnKeyPress} />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={handleClick}>
              追加
            </Button>
          </InputGroup.Append>
        </InputGroup>

        <ListGroup variant="flush">
          {participant.map((item, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between">
              <i className="bi bi-person">　{item}</i>
              <i className="bi bi-x-square bi-x-square-delete" onClick={(e) => handleDelete(e, index)}></i>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>

      <Container fluid>
        <div className="text-center my-3">
          <Button onClick={handleAdd}>ルーム新規作成</Button>
        </div>
      </Container>
    </Layout>
  )
}

export default RoomNew
