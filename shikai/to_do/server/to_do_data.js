if (ToDoClient.find().count() === 0) {
  ToDoClient.insert({
    title: 'To do number 1',
    description: 'abcdefg',
    date: '',
    completed: false
  });

  ToDoClient.insert({
    title: 'To do number 2',
    description: 'hijklmn',
    date: '',
    completed: false
  });

  ToDoClient.insert({
    title: 'To do number 3',
    description: 'opqrstuv',
    date: '',
    completed: true
  });

  ToDoClient.insert({
    title: 'To do number 4',
    description: 'abcdefg',
    date: '',
    completed: false
  });

  ToDoClient.insert({
    title: 'To do number 5',
    description: 'hijklmn',
    date: '',
    completed: false
  });

  ToDoClient.insert({
    title: 'To do number 6',
    description: 'opqrstuv',
    date: '',
    completed: true
  });

}