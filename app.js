const express=require('express');
const app=express();
app.use(express.urlencoded({extended:true}));
const methodOverride=require('method-override');
app.use(methodOverride('_method'));
const users=require('./models/users');
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('index',{users});
})
app.get('/add',(req,res)=>{
    res.render('add');
})
app.get('/view/:id',(req,res)=>{
    let {id}=req.params;
    const user=users.find((user)=>
    user.id==id
    ); 
    res.render('view',{user});
})
app.post('/add',(req,res)=>{
    const {name,price}=req.body;
    const user={
        id:users.length+1, 
        name,price,
    }
    users.push(user);
    res.redirect('/');
}); 
app.get('/edit/:id',(req,res)=>{
    let id=req.params.id;
    let data=users.find((data)=>
    data.id==id,
    );
    res.render('edit',{data});
})

app.patch('/edit/:id',(req,res)=>{
    let id=req.params.id;
    const {name,price}=req.body;
    const  user=users.find((user)=>
        user.id==id
    );
    user.name=name;
    user.price=price;
    res.redirect('/');
})
app.delete('/delete/:id',(req,res)=>{
    let {id}=req.params;
    const user=users.find((user)=>
        user.id==id
    );
    let ind=users.indexOf(user);
    users.splice(ind,1);
    res.redirect('/');

})
app.listen(4500,(req,res)=>{
    console.log('Server up at port 4500');
})