const baseUser = {
  login: '',
  email: '',
  first_name: '',
  last_name: '',
  middle_name: '',
  date_created: '',
  date_updated: '',
  company: {
    id: '6187f78eb1f751c4eab9f205',
    name: 'creators',
    info: 'Admin user 2',
    date_created: 1636289886,
    date_modified: 1636800592
  },
  role: 10
};

const user = (state = baseUser, action) => {
  switch (action.type) {
    case 'UPDATE_USER_DATA':
      return state = action.userData;
    default:
      return state;
  }
}

export default user;
