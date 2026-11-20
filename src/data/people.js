import { featuredPerson } from './featuredPerson.js';

export const featuredPersonId = '24520039';

export const people = [
  Object.assign({}, featuredPerson, {
    id: featuredPersonId,
  }),
  {
    id: 'alex-morgan',
    name: 'Alex Morgan',
    role: 'Product Designer',
    avatarSrc: '/profile-avatar.svg',
    avatarAlt: 'Profile illustration for Alex Morgan',
    facts: [
      {
        label: 'Team',
        value: 'Digital Experience',
      },
      {
        label: 'Focus',
        value: 'Usable interfaces and accessible interaction design',
      },
    ],
  },
  {
    id: 'jordan-lee',
    name: 'Jordan Alexandria Montgomery-Wellington',
    role: 'Research and Community Programme Coordinator for Accessible Information Systems and Inclusive Digital Services',
  },
];

export function getProfileFields(person) {
  return [
    {
      label: 'Name',
      value: person.name,
    },
    {
      label: 'Role',
      value: person.role,
    },
  ].concat(person.facts ?? []);
}
