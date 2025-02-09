const express = require("express");
const app = express();
const cors = require('cors')
const { connectDatabase } = require("./database/database");
const Blog = require("./model/blogModel");
connectDatabase()

app.use(express.json())   
app.use(express.urlencoded({extended:true}))// "  "
app.use(cors({
    origin : "http://localhost:5173", 
}))

app.get("/",(req,res)=> {
    res.status(200).json({
        message : "success"
    })
})

// GET API for all blogs: READ 
app.get("/blogs",async(req,res)=>{
    const blogs = await Blog.find()  // Blog maa store vako data 'blogs' maa janxa...[ Blog maa vako data vaneko form maa enter gareko data ho]
// .find() maa jahile ni data array format maa auxa.
    if(blogs.length == 0){
        res.status(404).json({
           // status : 404,
            message : "Empty blogs"
        })
    }
    else{
        res.status(200).json({
            message : "Blogs fetched successfully",
            blogs : blogs // blogs ko data show garxa 
        })
    }
})

// GET API for single blogs : READ 
app.get("/blogs/:id",async(req,res) => {
 //   // console.log(req.params.id)
 // YAHA DEKHI
     const id = req.params.id
    // const blog = await Blog.find({_id : id})
    // if(blog.length == 0){
    // res.json({
    //     status : 404,
    //     message : "couldnot found blogs with provided id"
    // })
    // }else {
 
    //     res.json({
    //     status : 200,
    //     message : "Blog fetched successfully",
    //     data : blog
    //     })
    // }
// YAHA SAMMA 

 // ALTERNATIVE for : const blog = await Blog.find({_id : id}) line
 //  

    const blog = await Blog.findById(id)  // it gives o/p in object format 
    if(blog){           // so for object format, no need to check length
        res.status(200).json ({
        //    status : 200,
            message : "Blog fetched successfully",
            data : blog

        })
    }else {
        res.status(404).json ({
        //    status : 404,
            message : "No blogs found with given ID"
           
        })
    }
})


// createBlog API for creating blog : CREATE 
app.post("/blogs",async (req,res)=> {
    const title = req.body.title;
    const subTitle = req.body.subTitle;
    const description = req.body.description

   // console.log(req.body)  // to show everything that filled in form to terminal


   // form ko data DB maa haleko:
    await Blog.create ({
        title : title,
        subTitle : subTitle,
        description : description

    })

    res.status(201).json({
       // status : 201,
        message : "Successfully showing"
    })
})


// UPDATE 
app.patch("/blogs/:id",async(req,res) => {
    const id = req.params.id
    const title = req.body.title
    const subTitle = req.body.subTitle
    const description = req.body.description


    await Blog.findByIdAndUpdate(id,{
        title : title, // update the title with entered title 
        subTitle : subTitle, // same .... and so onn.. 
        description : description
    })

    res.status(200).json ({
        message : "Blogs updated successfully"

    }) 

})


// DELETE 
app.delete("/blogs/:id",async(req,res)=>{
    const id = req.params.id


    await Blog.findByIdAndDelete(id) //delete the blog with entered API

    res.status(200).json({
        message : "Blog deleated successfully"
    })
})


PORT = 2000
app.listen(PORT, ()=> {
    console.log("Nodejs has started at port: ", PORT) 
})
