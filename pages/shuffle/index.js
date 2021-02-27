import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../../components/layout'
import {
  Container, InputGroup, FormControl, Button, ListGroup, Row, Col 
} from 'react-bootstrap'
import * as crypto from '../../lib/crypto'

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const ShuffleIndex = ({ posts }) => {
  const router = useRouter()
  const [result, setResult] = useState([])
  const [participant, setParticipant] = useState([])
  const [name, setName] = useState('')
  const [encrypt, setEncrypt] = useState('')
  const storageName = 'participant'

  useEffect(() => {
    const storageObject = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem(storageName)) : []
    setParticipant(storageObject)
  }, [])

  const setStorage = () => {
    localStorage.setItem(storageName, JSON.stringify(participant), { secure: false })
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
    if (e.key != 'Enter' || !name) return false

    setParticipant([...participant, name])
    setName('')
  }

  const handleShuffle = e => {
    e.preventDefault()

    setStorage()
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

    const raw = JSON.stringify(persons) // 暗号化する対象。stringなら何でも。
    setEncrypt(crypto.getEncryptedString(raw))
    // const decrypted = crypto.getDecryptedString(encrypted)
    // console.log(`decrypted: ${decrypted}`)
  }

  const hostPath = e => {
    return `${location.protocol}//${location.hostname}${router.pathname}/`
  }

  return (
    <Layout title="参加人">
      <h1 className="h1">参加人</h1>
      <Container fluid>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="あだ名"
            value={name}
            onChange={handleChange}
            onKeyPress={handleClick}
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

        <div className="text-center my-3">
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
          {result.length > 0 ? (
            <>
              <h5 className="border-bottom">URL</h5>
              <InputGroup className="my-3">
                <FormControl
                  readOnly
                  value={`${hostPath()}${encrypt}`}
                />
                <InputGroup.Append>
                  <Button variant="outline-secondary">コピー</Button>
                </InputGroup.Append>
              </InputGroup>
            </>
          ) : (<></>)}
        </Container>
      </Container>
    </Layout>
  )
}

export default ShuffleIndex
