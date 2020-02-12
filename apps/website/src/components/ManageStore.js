import React, { useEffect, useState } from "react";
import { Box, Heading, Button, Layer, FormField, Form } from 'grommet';
import { Add } from 'grommet-icons';
import config from '../config.js';
import './ManageStore.css';

const getProducts = async () => {
    try {
        const apiCall = await fetch(`${config.apiGateway.URL}/products`);
        const products = await apiCall.json();
        const sorted = products.sort((a,b) => {
        return (a.sort > b.sort) ? 1 : -1
        })
        console.log(sorted);

        return sorted;
    } catch(err) {
        return []
    }
}

export default function ClassForm(props) {

    const { productState, productDispatch, state } = props;
    const [showEditor, toggleEditor] = useState(false);
    const [editProduct, setEditProductData] = useState({});

    const productsList = (products) => {
        return (
            <Box className="productsList">
                {products.map((product) => {
                    return (

                        <Form className="productListItem" key={product.id}>
                            <div>
                                <a href={product.link}>{product.title}</a>
                            </div>
                            <div>
                                {product.category}
                            </div>
                            <div>
                                {product.description}
                            </div>
                            <div>
                                <FormField 
                                    name="order"
                                    label=""
                                    value={product.sort}
                                    onChange={(event) => {
                                        setSortValue(product,event.target.value)
                                    }}
                                />
                            </div>
                            <div>
                                <Button 
                                    label="Edit"
                                    onClick={() => {
                                        setEditProductData(product)
                                        toggleEditor(true);
                                    }}
                                />
                            </div>
                        </Form>
                    )
                })}
            </Box>
        )
    }

    const postProduct = async (product) => {
        try {
            const apiCall = await fetch(`${config.apiGateway.URL}/products`, {
                method: 'post',
                headers: new Headers({
                  Authorization: state.user.signInUserSession.idToken.jwtToken,
                }),
                body: JSON.stringify(product)
              });
            return await apiCall.json();
        } catch(err) {
            return err;
        }
    }

    const loadProducts = async () => {
        const products = await getProducts();
        productDispatch({ type: 'setProducts', value: products });
    }

    const updateProduct = async (product) => {
        await postProduct(product);
        loadProducts();
        console.log('update', product);
    }

    const setSortValue = (product, value) => {
        if (value.length && parseInt(value)) {
            try {
                product.sort = parseInt(value);
                postProduct(product)
            } catch(err) {
                console.log(err);
            }
        }
    }

    const getNext = (arr, key, inc) => {
        let all = arr.map((item) => parseInt(item[key]));
        return Math.max(...all) + inc;
    }

    useEffect( () => {
        loadProducts();
    },[])

    return (
        <Box>
            <Heading level={3}>Manage store</Heading>
            <Button
                icon={<Add/>}
                onClick={() => {
                    setEditProductData({
                        image: "",
                        category: "",
                        link: "",
                        sort: getNext(productState.products, 'sort', 10),
                        description: "",
                        id: getNext(productState.products, 'id', 1).toString(),
                        title: ""
                    })
                    toggleEditor(true);
                }}
            />
            {
                productState && productsList(productState.products)
            }
            {showEditor && (
                <Layer
                    onEsc={() => toggleEditor(false)}
                    onClickOutside={() => toggleEditor(false)}
                >
                    <Box pad="large" style={{width: "800px", maxWidth: "80vw"}}>
                        {editProduct.title}
                        <Form onSubmit={() => {
                            updateProduct(editProduct)
                            toggleEditor(false)
                        }}>
                            {Object.keys(editProduct).map((key) => {
                                if (key !== 'id') {
                                    return (
                                        <FormField
                                            key={key}
                                            name={key}
                                            label={key}
                                            value={editProduct[key]} 
                                            onChange={(event) => {
                                                const prod = JSON.parse(JSON.stringify(editProduct));
                                                prod[key] = event.target.value;
                                                setEditProductData(prod);
                                            }}
                                        />
                                    )
                                }
                            })}
                            <Button label="Cancel" onClick={() => toggleEditor(false)} />
                            <Button type="submit" primary label="Submit" />
                        </Form>
                    </Box>
                </Layer>
            )}
        </Box>
    )
}