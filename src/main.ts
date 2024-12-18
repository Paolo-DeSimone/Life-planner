// this file contains ONLY logic. Implementations inside classes.

import User from './Classes/User.js';

const user = new User("Paolo", "De Simone", 25, 1500)
console.log(user.getMember(User.ClassMembers.Name))
console.log(user.getMember(User.ClassMembers.Surname))
console.log(user.getMember(User.ClassMembers.Surname))
console.log(user.getMember(User.ClassMembers.Surname))

