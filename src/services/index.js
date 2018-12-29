import nanoid from 'nanoid';

const resetFakeDatabase = {
  users: {
    1: {
      id: 1,
      emailId: 'userone@email.com',
      firstName: 'UserOne',
      lastName: 'OneLastN',
      password: 'userone',
      sentEmails: [],
      readEmails: [],
      unreadEmails: [],
      deletedEmails: [],
      contacts: [2, 3]
    },
    2: {
      id: 2,
      emailId: 'usertwo@email.com',
      firstName: 'UserTwo',
      lastName: 'TwoLastN',
      password: 'usertwo',
      sentEmails: [],
      readEmails: [],
      unreadEmails: [],
      deletedEmails: [],
      contacts: [1]
    },
    3: {
      id: 3,
      emailId: 'userthree@email.com',
      firstName: 'UserThree',
      lastName: 'ThreeLastN',
      password: 'userthree',
      sentEmails: [],
      readEmails: [],
      unreadEmails: [],
      deletedEmails: [],
      contacts: [1, 2]
    }
  },
  emails: []
};

const getFakeDatabase = () => {
  let fakeDatabase = window.localStorage.getItem('fakeDatabase');
  if (!fakeDatabase) {
    window.localStorage.setItem(
      'fakeDatabase',
      JSON.stringify(resetFakeDatabase)
    );
    return resetFakeDatabase;
  }

  return JSON.parse(fakeDatabase);
};

const saveFakeDatabase = fakeDatabase => {
  window.localStorage.setItem(
    'fakeDatabase',
    JSON.stringify(resetFakeDatabase)
  );
};

const delay = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

const login = user => {
  return delay(500).then(() => {
    // if (Math.random() > 0.5) {
    //   throw new Error('Server is not available.');
    // }
    let fakeDatabase = getFakeDatabase();
    const fakeDbUsers = fakeDatabase.users;

    const foundUserId = Object.keys(fakeDbUsers).find(
      userId =>
        fakeDbUsers[userId].emailId === user.emailId &&
        fakeDbUsers[userId].password === user.password
    );

    const foundUser = fakeDbUsers[foundUserId];

    if (foundUser) {
      const { password, ...rest } = foundUser;
      return rest;
    } else {
      throw new Error('Invalid emailId or password.');
    }
  });
};

const mailAggregate = userId => {
  return delay(500).then(() => {
    // if (Math.random() > 0.5) {
    //   throw new Error('Server is not available.');
    // }
    let fakeDatabase = getFakeDatabase();

    const foundUser = fakeDatabase.users[userId];
    if (!foundUser) {
      throw new Error('Invalid User.');
    }

    const contacts = foundUser.contacts.map(id => {
      const { password, ...rest } = fakeDatabase.users[id];
      return rest;
    });

    return {
      contacts,
      emails: []
    };
  });
};

const sendEmail = email => {
  return delay(500).then(() => {
    // if (Math.random() > 0.5) {
    //   throw new Error('Server is not available.');
    // }

    let fakeDatabase = getFakeDatabase();

    email.id = nanoid();
    email.creationTime = new Date().getTime();
    fakeDatabase.emails.push(email);

    const fakeDbUsers = fakeDatabase.users;
    fakeDbUsers[email.from].sentEmails.push(email.id);
    fakeDbUsers[email.from].sentEmails = [
      ...new Set(fakeDbUsers[email.from].sentEmails)
    ];

    const pushUnreadEmail = (userId, email) => {
      fakeDbUsers[userId].unreadEmails.push(email.id);
      fakeDbUsers[userId].unreadEmails = [
        ...new Set(fakeDbUsers[userId].unreadEmails)
      ];
    };
    email.to.forEach(userId => pushUnreadEmail(userId, email));
    email.cc.forEach(userId => pushUnreadEmail(userId, email));

    saveFakeDatabase(fakeDatabase);

    return {
      email: email,
      user: fakeDbUsers[email.from]
    };
  });
};

const api = {
  login,
  mailAggregate,
  sendEmail
};

export default api;
