import Link from 'next/link'
import { useState, useEffect } from 'react';
import Layout from '../../components/layout'
import { Container, InputGroup, FormControl, Button, ListGroup } from 'react-bootstrap';

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const ShuffleIndex = ({ posts }) => {
  const [result, setResult] = useState([])
  const [participant, setParticipant] = useState([])
  const [name, setName] = useState('')
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
    console.log(shuffled)
    const halfStart = shuffled.slice(0, shuffled.length/2)
    const halfEnd = shuffled.slice(shuffled.length/2)
    console.log(halfStart)
    console.log(halfEnd)

    const persons = halfStart.map((person, index) => ({
      person1: person,
      person2: halfEnd[index],
    }))
    setResult(persons)
    console.log(result)
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
            <Button variant="outline-secondary" onClick={handleClick}>Button</Button>
          </InputGroup.Append>
        </InputGroup>

        <ListGroup variant="flush" >
          {participant.map((item, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between">
              {item}
              <Button size="sm" variant="outline-secondary" onClick={e => handleDelete(e, index)}>x</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <div className="text-center my-3">
          <Button variant={participant.length > 2 ? 'success' : 'secondary'} disabled={participant.length > 2 ? false : true} onClick={handleShuffle}>
            シャッフル!!!
          </Button>
        </div>

        {result.map((person, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between">
            {person.person1}
            {person.person2}
          </ListGroup.Item>
        ))}
      </Container>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const posts = ''
  return { props: { posts } }
}

export default ShuffleIndex
