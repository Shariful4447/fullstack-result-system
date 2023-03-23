export const ADMIN_ROUTES = {
  auth: { name: "Auth", path: "/admin/auth" },
  dashboard: { name: "Dashboard", path: "/admin" },
  users: { name: "Users", path: "/admin/users" },
  classes: { name: "Classes", path: "/admin/classes" },
  subjects: { name: "Subjects", path: "/admin/subjects" },
};

export const TEACHER_ROUTES = {
  auth: { name: "Auth", path: "/teacher/auth" },
  home: { name: "Home", path: "/teacher" },
  tests: { name: "Tests", path: "/teacher/:subjectId" },
  pupils: { name: "Pupils", path: "/teacher/:subjectId/pupils" },
  testDetail: { name: "TestDetail", path: "/teacher/:subjectId/test/:testId" },
};

export const USER_ROUTES = {
  home: { name: "Home", path: "/pupil" },
  auth: { name: "Auth", path: "/pupil/auth" },
  tests: {name: "Tests", path: "/pupil/:subjectId"}
};
