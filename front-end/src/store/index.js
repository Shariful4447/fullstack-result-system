import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import adminAuthReducer from "./admin/auth/reducer";
import adminUsersReducer from "./admin/users/reducer";
import adminClassesReducer from "./admin/classes/reducer";
import adminSubjectsReducer from "./admin/subjects/reducer";
import adminUtilitySubjectOptionsReducer from "./admin/utility/add-subject/reducer";
import adminUtilityClassPupilOptionOptionsReducer from "./admin/utility/class-pupil-option/reducer";
import teacherAuthReducer from "./teacher/auth/reducer";
import teacherPupilOptionsReducer from "./teacher/utility/pupil-options/reducer";
import teacherAssignedSubjectsReducer from "./teacher/assigned-subjects/reducer";
import teacherAverageGradesReducer from "./teacher/average-grades/reducer";
import teacherTestsReducer from "./teacher/tests/reducer";
import teacherPupilTestGradeReducer from "./teacher/test-pupil-grade/reducer";
import pupilAuthReducer from "./pupil/auth/reducer";
import pupilSubjectAverageGradeReducer from "./pupil/subject-average-grades/reducer";
import pupilSubjectTestGradeReducer from "./pupil/subject-test-grade/reducer";

const rootReducer = combineReducers({
  adminAuth: adminAuthReducer,
  adminUsers: adminUsersReducer,
  adminClasses: adminClassesReducer,
  adminSubjects: adminSubjectsReducer,
  adminUtilitySubjectOptions: adminUtilitySubjectOptionsReducer,
  adminUtilityClassPupilOptionOptions: adminUtilityClassPupilOptionOptionsReducer,
  teacherAuth: teacherAuthReducer,
  teacherAssignedSubjects: teacherAssignedSubjectsReducer,
  teacherAverageGrades: teacherAverageGradesReducer,
  teacherTests: teacherTestsReducer,
  teacherPupilOptions: teacherPupilOptionsReducer,
  teacherPupilTestGrade: teacherPupilTestGradeReducer,
  pupilAuth: pupilAuthReducer,
  pupilSubjectAverageGrade: pupilSubjectAverageGradeReducer,
  pupilSubjectTestGrade: pupilSubjectTestGradeReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
