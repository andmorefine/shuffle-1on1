import axios from 'axios'
import { createClient } from 'microcms-js-sdk'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import Layout from '../../components/layout'
import {
  Container, Button, InputGroup, FormControl, ListGroup, Form, Row, Col
} from 'react-bootstrap'

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_DOMAIN,
  apiKey: process.env.NEXT_PUBLIC_X_API_KEY,
})

const config = {
  headers: {
    'X-WRITE-API-KEY': process.env.NEXT_PUBLIC_X_WRITE_API_KEY,
    'Content-Type': 'application/json'
  }
}
const url = `https://${process.env.NEXT_PUBLIC_DOMAIN}.microcms.io/api/v1/shuffle_rooms`

const RoomShow = () => {
  const router = useRouter()
  // パスパラメータから値を取得
  const { id } = router.query

  const [result, setResult] = useState([])
  const [title, setTitle] = useState([])
  const [participant, setParticipant] = useState([])
  const [name, setName] = useState('')

  const getRoom = () => {
    client.get({ endpoint: `shuffle_rooms/${id}` })
    .then((res) => {
      console.log(res)
      setTitle(res.title)
      setParticipant(JSON.parse(res.menbers))
    })
  }
  useEffect(() => {
    if (!id) return

    getRoom()
  }, [id])

  const handleTilteChange = e => {
    setTitle(e.target.value)
  }

  const handleChange = e => {
    setName(e.target.value)
  }

  const handleDelete = (e, index) => {
    e.preventDefault()

    const newParticipant = [...participant]
    newParticipant.splice(index, 1)
    setParticipant(newParticipant)
  }

  const handleClick = e => {
    if (!name) return false

    setParticipant([...participant, name])
    setName('')
  }

  const handleOnKeyPress = e => {
    if (e.key != 'Enter' || !name) return false

    setParticipant([...participant, name])
    setName('')
  }

  const handleUpdate = e => {
    e.preventDefault()

    const data = {
      title: title,
      menbers: JSON.stringify(participant),
    }

    axios.patch(`${url}/${id}`, data, config)
    .then((response) => {
      console.log(response)
      getRoom()
    })
  }

  const handleShuffle = e => {
    e.preventDefault()

    const shuffled = shuffle(participant)
    const halfStart = shuffled.slice(0, shuffled.length/2)
    const halfEnd = shuffled.slice(shuffled.length/2)

    const persons = halfStart.map((person, index) => ({
      person1: person,
      person2: halfEnd[index],
    }))

    // 偶数ではない場合
    if ((shuffled.length % 2) > 0) {
      const residuePerson = halfEnd.slice(-1)[0]
      const lastPerson = persons.slice(-1)[0].person2
      persons.slice(-1)[0].person2 = `${lastPerson}(${residuePerson})`
    }
    setResult(persons)
  }

  return (
    <Layout title="組み合わせページ">
      <h1 className="h1">組み合わせページ</h1>

      <Container fluid>
        <h3 className="h3 d-flex justify-content-between">
          <span>ルーム名</span>
          <Button variant="outline-warning" size="sm" onClick={handleUpdate}>更新</Button>
        </h3>
        <InputGroup hasValidation>
          <InputGroup.Text><i className="bi bi-house-door-fill"></i></InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="精神と時の部屋"
            required
            value={title}
            onChange={handleTilteChange}
          />
        </InputGroup>
      </Container>

      <Container fluid className="mt-4">
        <h3 className="h3">メンバー</h3>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="あだ名"
            value={name}
            onChange={handleChange}
            onKeyPress={handleOnKeyPress}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={handleClick}>追加</Button>
          </InputGroup.Append>
        </InputGroup>

        <ListGroup variant="flush" >
          {participant.map((item, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between">
              <i className="bi bi-person">　{item}</i>
              <i className="bi bi-x-square bi-x-square-delete" onClick={e => handleDelete(e, index)}></i>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>

      <div className="text-center my-4">
        <Button variant={participant.length > 2 ? 'success' : 'secondary'} disabled={participant.length > 2 ? false : true} onClick={handleShuffle}>
          シャッフル!!!
        </Button>
      </div>

      <Container>
        {result.map((person, index) => (
          <Row key={index} className="mb-2 border-bottom">
            <Col xs={2} className="bg-info text-white text-center">{index + 1}組</Col>
            <Col>{person.person1}</Col>
            <Col xs={1}><i className="bi bi-arrow-left-right"></i></Col>
            <Col>{person.person2}</Col>
          </Row>
        ))}
      </Container>
    </Layout>
  )
}

export default RoomShow
