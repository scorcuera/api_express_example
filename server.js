import express from 'express';

import { createRequire } from 'module';
const readJSON = createRequire(import.meta.url);
const products = readJSON('./data/products.json');


const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/products', (request, response) => {
    response.send(products);
});

app.get('/products/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const product = products.products.find(product => product.id === id);
    response.send(product);
});

app.post('/products', (request, response) => {
    const newProduct = request.body;
    const previousId = products.products[products.products.length - 1].id;
    products.products.push({...newProduct, id: previousId + 1});
    response.send('Product has been added');
});

app.put('/products/:id', (request, response) => {});

app.delete('/products/:id', (request, response) => {});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// acabar de completar la lógica pra put y delete
// cómo enchufar esto con mysql
// cómo aplicar arquitectura MVC a esto