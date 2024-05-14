require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Task = require('./models/Task');
const User = require('./models/User');
const app = express();
const session = require('express-session');
const bcrypt = require('bcrypt');



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'my_secret_key',
  resave: false,
  saveUninitialized: false
}));


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

  function requireLogin(req, res, next) {
    if (req.session && req.session.user) {
        return next();
  
    } else {
        return res.redirect('/login'); // Redirect to login page if not authenticated
    }
  }
// Import required modules and setup middleware...

app.get('/logout', (req, res) => {
  // Destroy the session and redirect to the login page
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login');
  });
});

app.get('/search', requireLogin, async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const tasks = await Task.find({ title: { $regex: keyword, $options: 'i' } });
    res.render('index', { tasks });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


app.get('/signup',(req,res)=>{
  res.render('signup');
});

app.get('/login',(req,res)=>{
  res.render('login');
});

app.get('/',requireLogin , async(req, res) => {
   try {
  const tasks = await Task.find();
  res.render('index', { tasks });
} catch (err) {
  console.error(err);
  res.status(500).send('Server Error');
}
});

app.get('/addTask',requireLogin , (req, res) => {
  res.render('add');
});

app.get('/edit/:id',requireLogin , async(req, res) => {
  try {
  const taskId = req.params.id;
  console.log(taskId);
  const task = await Task.findById(taskId);
  console.log(task);
  if (!task) {
    return res.status(404).send('Task not found');
  }
  res.render('edit', { task });
} catch (err) {
  console.error(err);
  res.status(500).send('Server Error');
}
});

app.post('/login', async (req,res) => {
  const {email, password}= req.body;
  const user = await User.findOne({email});
  if(!user){
      return res.status(500).send("Email doesnot exists!");
  }
  try{
      if( await bcrypt.compare(password,user.password))
      {
          // res.status(200).send('Successfully Loged in!');
          req.session.user = user;
          console.log("Login successful");
          res.redirect('/');
      }
      else{
          res.status(401).send("Incorrect Password");
      }
  }
  catch(err){
      console.err(err);
      res.status(500).send('Error loging in!');
  }

});

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
  
    // Check if all fields are filled
    if (!name || !email || !password) {
      return res.status(400).send('All fields are required');
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save it to the database
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // res.status(201).send('User created successfully');
    
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while creating the user');
  }
  res.redirect('/login');
});


app.post('/add',async(req,res)=>{
  try {
    const { title, description, status } = req.body;
    const newTask = new Task({ title, description, status });
    await newTask.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/edit/:id', async(req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;
    await Task.findByIdAndUpdate(taskId, { title, description, status });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/delete/:id',async(req,res)=>{
  try {
    const taskId = req.params.id;
    await Task.findByIdAndDelete(taskId);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});