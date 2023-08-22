const express = require('express');
require('./db/config');
const cors = require('cors');
const User = require('./db/user');
const Product = require('./db/product');
const Jwt = require('jsonwebtoken');
const jwtKey = "e-com";
const PORT = process.env.PORT || 3000
const app = express();
app.use(express.json());
app.use(cors());
app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, (err, token) => {
        if (err) {
            res.send({ result: "Something went wrong, please try again later" })
        }
        res.send({ result, auth: token })
    })
    // res.send(result);
    // console.log(result);
})

app.post('/login', async (req, res) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, (err, token) => {
                if (err) {
                    res.send({ result: "Something went wrong, Please try again later" })
                }
                res.send({ user, auth: token })
            })
        } else {
            res.send({ result: "User not found" })
        }
    } else {
        res.send({ result: "User not found" })
    }
})

app.post('/add', async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
    console.log(result);
})


app.get('/products', async (req, res) => {
    let products = await Product.find();
    /* if(products.length>0){
         res.send(products)
     }else{
         res.send({result: "No products found"})
     }*/
    res.send(products)
})

app.delete('/products/:id', async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);

})

/*app.get('/products/:id', async(req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result)
    }else{
        res.send({result:"No record found"})
    }
})*/


// app.post('/products', async(req,res)=>{
//     let product= new Product(req.params.id);
//     let result = await product.save();
//     res.send(result);
//     console.log(result);
// })


app.put('/products/:id', async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result)
})






app.get('/search/:key', async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { brand: { $regex: req.params.key } },
            { price: { $regex: req.params.key } }

        ]
    })
    res.send(result);
})
app.get('/profile/:id', async (req, res) => {
    let result = await User.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "No record found" })
    }

})
app.listen(PORT)
// const dbConnect= async()=>{


//     const productSchema = new mongoose.Schema({});
//     const product = mongoose.model('users',productSchema);

//     const result = await product.find();
//     console.warn(result);
//     // try {
//     //     const result = await product.find();
//     //     console.warn(result);
//     //   } catch (error) {
//     //     console.error('Error fetching data:', error);
//     //   }
// }
// dbConnect();

