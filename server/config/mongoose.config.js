const mongoose = require('mongoose')
const port = '27017'
const db = 'testauthors'

mongoose.set('strictQuery', false)
mongoose.connect(`mongodb://localhost:${port}/${db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log(`Successfully connected to database ${db}\nRunning on port ${port}`)
})
.catch((err) => console.error(err))