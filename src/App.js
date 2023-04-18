import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

import './App.scss';
import { useState, useEffect } from "react";
import Axios from 'axios';
import { API_ADD_HackMDData, API_DELETE_HackMDData, API_GET_HackMDData, API_UPDATE_HackMDData } from './constants'

function App() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const [hackmdList, setHackmdList] = useState([])

  useEffect(() => {
    Axios.get(API_GET_HackMDData).then((res) => {
      setHackmdList(res.data)
    })
  }, [])

  const addToList = () => {
    Axios.post(API_ADD_HackMDData, {
      title: title,
      author: author,
      url: url,
    }).then((res) => {
      window.location.reload(false)
    })
  }

  const updateTitle = (id) => {
    Axios.put(API_UPDATE_HackMDData, {
      id: id,
      newTitle: newTitle,
    }).then((res) => {
      window.location.reload(false)
    })
  }

  const deleteHackmd = (id) => {
    Axios.delete(`${API_DELETE_HackMDData}/${id}`)
    .then((res) => {
      window.location.reload(false)
    })
  }

  return (
    <div className="App container">
      <h1>HackMD CRUD APP with MERN</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title"
            onChange={(event) => { setTitle(event.target.value); }} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" placeholder="Enter author"
            onChange={(event) => { setAuthor(event.target.value); }} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>URL</Form.Label>
          <Form.Control type="text" placeholder="Enter url"
            onChange={(event) => { setUrl(event.target.value); }} />
        </Form.Group>

        <Button variant="primary" onClick={addToList}>
          Submit
        </Button>
      </Form>

      <hr />

      <h2>Hackmd List</h2>

      <div className="row row-cols-2 g-3">
        {hackmdList.map((val, key) => {
          return (
            <div key={key} className="col">
              <Card>
                <Card.Body>
                  <Button variant="primary" onClick={() => {deleteHackmd(val._id)}} style={{ float: 'right', marginLeft: '0.5rem' }}><FontAwesomeIcon icon={faTrashCan} /></Button>
                  <Card.Title className="mb-3">{val.title}</Card.Title>
                  <Card.Subtitle className="mb-4 text-muted">{val.author}</Card.Subtitle>
                  <Card.Link className="link-primaryDark" href={val.url} target="_blank">Hackmd Link</Card.Link>
                  <hr />
                  <div className="update-block">
                    Edit Title
                    <Form.Control type="text" placeholder="Enter new title" className="w-50"
                      onChange={(event) => { setNewTitle(event.target.value); }} />
                    <Button variant="primary" onClick={() => {updateTitle(val._id)}} style={{ float: 'right' }}>Update</Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          )
        })}
      </div>

    </div>
  );
}

export default App;
