import { modules, students, mentors, classes } from "./hyf.js";

/**
 * We would like to have a list of everyone that is currently participating in a class.
 * This means the students, but also the mentors that are currently teaching the class.
 * The students should be self explanatory, but to find the mentors you will need to follow these steps:
 * - Check what the `currentModule` of the class is
 * - Find the mentor(s) that are `nowTeaching` that module
 *
 * Should return the list of names and their roles. So something like:
 *
 *  [{ name: 'John', role: 'student' }, { name: 'Mary', role: 'mentor' }]
 */
const getPeopleOfClass = (className) => {
  const currentClass = classes.find((classInfo) => classInfo.name === className);

  if (!currentClass) {
    return 'Class not found';
  }

  const studentsInClass = students
    .filter((student) => student.class === className)
    .map((student) => ({ name: student.name, role: 'student' }));

  const mentorsInClass = mentors
    .filter(
      (mentor) =>
        mentor.nowTeaching === className ||
        (mentor.nowTeaching  === currentClass.currentModule)
    )
    .map((mentor) => ({ name: mentor.name, role: 'mentor' }));

  return [...studentsInClass, ...mentorsInClass];
};

 console.log(getPeopleOfClass('class34'));

/**
 * We would like to have a complete overview of the current active classes.
 * First find the active classes, then for each get the people of that class.
 *
 * Should return an object with the class names as properties.
 * Each class name property contains an array identical to the return from `getPeopleFromClass`. So something like:
 *
 *  {
 *    class34: [{ name: 'John', role: 'student' }, { name: 'Mary', role: 'mentor' }],
 *    class35: [{ name: 'Jane', role: 'student' }, { name: 'Steve', role: 'mentor' }]
 *  }
 */
const getActiveClasses = () => {
  const activeClasses = classes.filter((cls) => cls.active);

  const result = {};

  activeClasses.forEach((classInfo) => {
    const { name: className, currentModule } = classInfo;
    const peopleInClass = [];

    students.forEach((student) => {
      if (student.class === className) {
        peopleInClass.push({ name: student.name, role: 'student' });
      }
    });

    mentors.forEach((mentor) => {
      if (mentor.canTeach && mentor.canTeach.includes(currentModule)) {
        peopleInClass.push({ name: mentor.name, role: 'mentor' });
      }
    });

    result[className] = peopleInClass;
  });

  return result;
};

 console.log(getActiveClasses());
