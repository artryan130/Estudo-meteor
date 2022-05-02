import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/dbmeteor remove autopublish/TasksCollection';
import { Accounts } from 'meteor/accounts-base';
import '/imports/api/tasksMethods';

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
});

const SEED_USERNAME = 'meteorite'
const SEED_PASSWORD = 'password'

Meteor.startup(()=> {
  if(!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD
    })
  }
})

const user = Accounts.findUserByUsername(SEED_USERNAME);

if (TasksCollection.find().count() === 0) {
  [
    'First Task',
    'Second Task',
    'Third Task',
    'Fourth Task',
    'Fifth Task',
    'Sixth Task',
    'Seventh Task',
  ].forEach(taskText => insertTask(taskText, user));
}

ServiceConfiguration.configurations.upsert(
  {service: 'github'},
  {
    $set: {
      loginStyle: 'popup',
      clientId: 'ce4b109b30462079446f', // insert your clientId here
      secret: 'ca1431e3f91551df12b18226127775fcc59c2322'
    }
  }
)