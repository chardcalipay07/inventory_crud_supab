import { Card, Button, Form } from "react-bootstrap"
import { useState } from "react"
import { supabase } from "../supabaseClient";

export default function ProductCard(props) {
    const product = props.product;
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(product.name);
    const [description, setdescription] = useState(product.description);

    async function deleteProduct() {
        try {
            const { data, error } = await supabase
                .from("products")
                .delete()
                .eq("id", product.id)
                if (error) throw error
                window.location.reload();
            } catch(error) {
                console.log(error)
            }
    }

    async function updateProduct() {
        try {
            const { data, error } = await supabase
                .from("products")
                .update({
                    name: name,
                    description: description
                })
                .eq("id", product.id)
                if (error) throw error
                window.location.reload();
            } catch(error) {
                console.log(error)
            }
    }

    return (
        <>
            <Card style={{width:"18rem"}}>
                <Card.Body>
                    { editing == false ?
                        <>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <Button variant="danger" onClick={() => deleteProduct()}>Delete Button</Button>
                            <Button variant="secondary" onClick={() => setEditing(true)}>Edit Button</Button>
                        </>
                        :
                        <>
                            <h4>Editing Product</h4>
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control 
                                type="text"
                                id="name"
                                defaultValue={product.name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control 
                                type="text"
                                id="description"
                                defaultValue={product.description}
                                onChange={(e) => setdescription(e.target.value)}
                            />
                            <br/>
                            <Button onClick={() => updateProduct()}>Update Product in Supabase DB</Button>
                            <Button size="sm" onClick={() => setEditing(false)}>Go back</Button>
                            <br />
                        </>
                    }
                </Card.Body>
            </Card>
        </>
    )
}
