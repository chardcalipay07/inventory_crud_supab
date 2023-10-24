import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container, Nav, Row, Form, Col, Button } from 'react-bootstrap' 
import { useState, useEffect } from 'react'
import ProductCard from './components/productCard';
import { supabase } from './supabaseClient';

function App() {
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])


  async function getProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(10)
        if (error) throw error
        if (data != null) {
          setProducts(data)
        }
    } catch(error) {
      console.log(error)
    }
  }

  async function createProduct() {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert({
          name: name,
          description: description
        })
        .single()
        if (error) throw error
        window.location.reload();
    } catch(error) {
      console.log(error)
    }
  }


  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand>Store Product</Navbar.Brand>
          <Nav>
            <Nav.Item>Created by chdcode</Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <Container>
          <Row>
            <Col xs={12} md={8}>
              <h3>Created product for Supabase database</h3>
              <Form.Label>Product Name</Form.Label>
              <Form.Control 
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Label>Product Description</Form.Label>
              <Form.Control 
                type="text"
                id="description"
                onChange={(e) => setdescription(e.target.value)}
              />
              <br/>
              <Button onClick={() => createProduct()}>Create Product in Supabase DB</Button>
            </Col>
          </Row>
          <hr />
          <h3>Current database Items</h3>
          <Row xs={1} lg={3} className='g-4'> 
            {products.map((product) => (
                <Col key={product.id}>
                  <ProductCard product={product} />
              </Col>
            ))}
          </Row>
      </Container>
    </>
  )
}

export default App
