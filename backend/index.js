const axios = require('axios');
const mysql = require('mysql2')
const express = require('express');
const cors = require('cors');
const multer = require('multer');


const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
express.urlencoded({ extended: true })

//multler setup
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // Limit file size to 10 MB
    }
});

//connect database

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hari@2004',
    database: 'cartellanew'
})

//checking database connection
db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to the database');
});


//listening the port 3000
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});

// sending products to the frontend 
app.get('/products', (req, res) => {
   sql = "SELECT * FROM products";
   db.query(sql,(error,data)=>{
    if(error){
        return res.status(500).json({error: "Error reciving products"})
    }
    data = data.map(product => ({
        ...product,
        image: product.image.toString('base64')
    }));
    res.json(data);
   })
});

//sending trending data

app.get('/trending',(req,res)=>{
   sql = "SELECT * FROM products WHERE category = 'trending'";
   db.query(sql,(error,data)=>{
    if(error){
        return res.status(500).json({error: "Error receiving the trending"})
    }
    data = data.map(product => ({
        ...product,
        image: product.image.toString('base64')
    }));
    res.json(data)
   })
})

//sending bestseller

app.get('/bestseller',(req,res)=>{
    sql="SELECT * FROM products WHERE category = 'bestseller'"
    db.query(sql,(error,data)=>{
        if(error){
            return res.status(500).json({error: "Error receiving bestseller"})
        }
        data = data.map(product => ({
            ...product,
            image: product.image.toString('base64')
        }));
        res.json(data)
    })
})

// adding new user 

app.post('/register',(req,res)=>{
    const sql = "INSERT INTO users (`email`,`password`) VALUES (?,?)"
    db.query(sql,[req.body.email,req.body.password],(err,results)=>{
        if(err){
            return res.json("Error")
        }
        return res.json(results)
    })
})

//getting all users

app.get('/getuser',(req,res)=>{
    const  sql = "SELECT email FROM users"
    db.query(sql,(error,data)=>{
        if(error){
            return res.status(500).json({error: "Error receiving users"})
        }
        res.json(data)
    })

})

//checking user exist 

app.post('/login',(req,res)=>{
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql,[req.body.email,req.body.password],(err,data)=>{
        if(err){
            return res.json("Error")
        }
        if(data.length > 0){
            return res.json("success")
        }else{
            return res.json("No record found")
        }
        
    })
})

// saving products to db

app.post('/newItem', upload.single('image'), (req, res) => {
    if (!req.file || !req.body.name || !req.body.price || !req.body.description || !req.body.category ||!req.body.size || !req.body.rating){
        return res.status(400).json({ error: "All fields are required." });
    }
    
    const sql = "INSERT INTO products(`image`,`name`,`description`,`price`,`category`,`size`,`rating`) VALUES (?,?,?,?,?,?,?)";
    db.query(sql, [req.file.buffer, req.body.name,req.body.description, req.body.price,req.body.category,req.body.size,req.body.rating], (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Error inserting data" });
        } else {
            return res.json({success: "product added", id: data.insertId});
        }
    });
});

//adding product to cart database
app.post('/cartdb', upload.single('image'), (req, res) => {
    const { name, description, price, category, size, rating, user } = req.body;
    const image = req.file.buffer; 
    if (!name || !description || !price || !category || !size || !rating || !user || !image) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const sql = "INSERT INTO cart (`image`, `name`, `description`, `price`, `category`, `size`, `rating`, `user`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [image, name, description, price, category, size, rating, user], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to insert data into cart.' });
        }

        return res.json({ success: 'Product added to cart', id: result.insertId });
    });
});

//getting datafrom cartdb
app.all('/cartitems',(req,res)=>{
    const {user} = req.body
    if(!user){
        return res.status(500).json({error: 'No Username'})
    }
    const sql = ' SELECT * FROM cart WHERE user = ? AND status IS NULL '
    db.query(sql,[user],(error,data)=>{
        if(error){
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Failed to search item' });
        }
        data = data.map(product => ({
            ...product,
            image: product.image.toString('base64')
        }));
        return res.json(data)
    })
})

//deleting data from cart
app.post('/deleteproduct',(req,res)=>{
    const {id} = req.body
    if(!id){
        return res.status(400).json({error : "No id value is got!"})
    }
    const sql = 'DELETE FROM cart WHERE id = ?'
    db.query(sql,[id],(error,data)=>{
        if(error){
            console.log({ error : "databaseError"})
            return res.status(500).json({ error : "Database error!"})
        }
        return res.json({result: "Product removed!"})
    })
})

//updating order status 

app.post('/orderstatus',(req,res)=>{
    const {status,user} = req.body
    console.log(req.body)
    if(!status || !user){
        return res.status(400).json({error : "Error getting values"})
    }
    const sql = 'UPDATE cart SET `status` = ? WHERE `user` = ?'
    db.query(sql,[status,user],(error,data)=>{
        if(error){
            console.log({error: 'Error occured in database'})
            return res.status(500).json({error: "Database erorr"})
        }
        return res.json({success : "status updated!"})
    })
})

//get products ordered 
app.post('/orderedproducts',(req,res)=>{
    const {user} = req.body
    if(!user){
        return res.status(400).json({error : "no user detected"})
    }
    const sql = "SELECT * FROM cart WHERE user = ? AND status = 'placed' "
    db.query(sql,[user],(error,data)=>{
        if(error){
            console.log(error)
            return res.status(500).json({error: "Database error"})
        }
        data = data.map(product => ({
            ...product,
            image: product.image.toString('base64')
        }));
        return res.json(data)
    })
})

// admin pannel auth

app.get('/userpass' , (req,res)=>{
    return res.json({
        email: "charishankar30@gmail.com",
        password : "Hari@2004"
    })
})
