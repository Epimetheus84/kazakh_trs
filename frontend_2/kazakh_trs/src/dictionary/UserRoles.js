const userRoles = {
  10: 'admin',
  1: 'moderator',
  0: 'user',
};

const userRolesLocale = {
  10: 'администратор',
  1: 'модератор',
  0: 'пользователь',
};

export const getUserRole = (roleId = 0) => {
  return userRoles[roleId];
}

export const getUserRoleLocale = (roleId = 0) => {
  return userRolesLocale[roleId];
}
