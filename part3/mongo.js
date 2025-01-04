const mongoose = require('mongoose');
const argvLen = process.argv.length;

if (argvLen < 3) {
  console.log('Please provide password as argument.');
  process.exit(1);
}

const dbPassword = encodeURIComponent(process.argv[2]);

//Real username replaced with a placeholder
const url = `mongodb+srv://USERNAME:${dbPassword}@cluster0.mwkvo.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (argvLen === 3) {
  console.log('Phonebook:');
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const name = process.argv[3];
  const number = argvLen > 4 ? process.argv[4] : '';

  const person = new Person({
    name: name,
    number: number
  });

  person.save().then(() => {
    console.log(`Added ${name} ${number} to the phonebook.`);
    mongoose.connection.close();
  });
}

