import nanoid from 'nanoid';

const resetFakeDatabase = {
  users: {
    1: {
      id: 1,
      emailId: 'userone@email.com',
      firstName: 'UserOne',
      lastName: 'OneLastN',
      password: 'userone',
      emails: [],
      contacts: [2, 3]
    },
    2: {
      id: 2,
      emailId: 'usertwo@email.com',
      firstName: 'UserTwo',
      lastName: 'TwoLastN',
      password: 'usertwo',
      emails: [],
      contacts: [1, 3]
    },
    3: {
      id: 3,
      emailId: 'userthree@email.com',
      firstName: 'UserThree',
      lastName: 'ThreeLastN',
      password: 'userthree',
      emails: [],
      contacts: [1, 2]
    }
  },
  tags: {
    inbox: { id: 1, label: 'inbox' },
    trash: { id: 2, label: 'trash' },
    sent: { id: 3, label: 'sent' }
  },
  emails: {}
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
  window.localStorage.setItem('fakeDatabase', JSON.stringify(fakeDatabase));
};

const delay = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

const login = ({ user }) => {
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

const logout = () => {
  return delay(500).then(() => {
    // if (Math.random() > 0.5) {
    //   throw new Error('Server is not available.');
    // }

    return {
      message: 'Logout successfully.'
    };
  });
};

const mailAggregate = ({ userId }) => {
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

    const { password, ...restProfileUser } = foundUser;

    return {
      contacts,
      emails: foundUser.emails.map(emailId => fakeDatabase.emails[emailId]),
      tags: getTagsAsList(fakeDatabase),
      profileUser: restProfileUser
    };
  });
};

const sendEmail = ({ email }) => {
  return delay(500).then(() => {
    // if (Math.random() > 0.5) {
    //   throw new Error('Server is not available.');
    // }

    let fakeDatabase = getFakeDatabase();
    const fakeDbUsers = fakeDatabase.users;

    email.tags = [];
    email.unread = true;

    //add email as sent to from user
    const fromEmail = cloneEmail(email);
    fromEmail.tags = pushToListUniquely(
      fromEmail.tags,
      fakeDatabase.tags.sent.id
    );
    fakeDbUsers[email.from].emails.push(fromEmail.id);
    fakeDatabase.emails[fromEmail.id] = fromEmail;

    [...new Set([...email.to, ...email.cc])].forEach(userId => {
      //if fromUser is also in to/cc then just add tag
      if (userId === email.from) {
        fromEmail.tags = pushToListUniquely(
          fromEmail.tags,
          fakeDatabase.tags.inbox.id
        );
        return;
      }

      const toEmail = cloneEmail(email);
      toEmail.tags = pushToListUniquely(
        toEmail.tags,
        fakeDatabase.tags.inbox.id
      );
      fakeDbUsers[userId].emails.push(toEmail.id);
      fakeDatabase.emails[toEmail.id] = toEmail;
    });

    saveFakeDatabase(fakeDatabase);

    return {
      email: fromEmail,
      user: fakeDbUsers[email.from],
      message: 'Email sent successfully'
    };
  });
};

const markEmail = ({ emailId, markAs }) => {
  return delay(100).then(() => {
    // if (Math.random() > 0.5) {
    //   throw new Error('Server is not available.');
    // }

    const emailIdList = Array.isArray(emailId) ? emailId : [emailId];

    let fakeDatabase = getFakeDatabase();
    let message;

    emailIdList.forEach(emailId => {
      const email = fakeDatabase.emails[emailId];
      switch (markAs) {
        case 'read':
          email.unread = false;
          message = 'Email marked as read successfully!';
          break;
        case 'unread':
          email.unread = true;
          message = 'Email marked as unread successfully!';
          break;
        case 'trash':
          email.tags = pushToListUniquely(
            email.tags,
            fakeDatabase.tags.trash.id
          );
          message = 'Email moved to trash successfully!';
          break;
        default:
          break;
      }
    });

    saveFakeDatabase(fakeDatabase);

    return {
      emails: emailIdList.map(emailId => fakeDatabase.emails[emailId]),
      message
    };
  });
};

const getTagsAsList = fakeDatabase => {
  return Object.keys(fakeDatabase.tags).map(
    tagKey => fakeDatabase.tags[tagKey]
  );
};

const pushToListUniquely = (list, value) => {
  list.push(value);
  return [...new Set(list)];
};

const cloneEmail = email => {
  email.id = nanoid();
  return JSON.parse(JSON.stringify(email));
};

const api = {
  login,
  logout,
  mailAggregate,
  sendEmail,
  markEmail
};

export default api;
