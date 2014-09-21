if (ToDoClient.find().count() === 0) {

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

randomDate(new Date(2012, 0, 1), new Date())

  ToDoClient.insert({
    title: 'To do number 1',
    description: 'abcdefg',
    date: randomDate(new Date(2012, 0, 1), new Date()),
    completed: false
  });

  ToDoClient.insert({
    title: 'To do number 2',
    description: 'hijklmn',
    date: randomDate(new Date(2012, 0, 1), new Date()),
    completed: false
  });

  ToDoClient.insert({
    title: 'To do number 3',
    description: 'opqrstuv',
    date: randomDate(new Date(2012, 0, 1), new Date()),
    completed: true
  });

  ToDoClient.insert({
    title: 'To do number 4',
    description: 'abcdefg',
    date: randomDate(new Date(2012, 0, 1), new Date()),
    completed: false
  });

  ToDoClient.insert({
    title: 'To do number 5',
    description: 'hijklmn',
    date: randomDate(new Date(2012, 0, 1), new Date()),
    completed: false
  });

  ToDoClient.insert({
    title: 'To do number 6',
    description: 'opqrstuv',
    date: randomDate(new Date(2012, 0, 1), new Date()),
    completed: true
  });

}