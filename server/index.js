const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const app = express();
const userRoutes = require('./routes/userRoutes')
const userReminders = require('./routes/reminders')
const UserMedications = require('./routes/medications')



// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
// Register routes
app.get('/', function (req, res) {
	res.send('landing page add /doctor to get all doctors');
});
app.use('/api/users',userRoutes);
app.use('/api/users',userReminders)
app.use('/api/users',UserMedications)

// Connect to MongoDB
// mongodb+srv://javedansari:Javed1993@cluster0.g1vsk36.mongodb.net/kratinDB
mongoose
  .connect('mongodb+srv://javed1993:javed1993@cluster0.nbx2jxt.mongodb.net/kratinDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
