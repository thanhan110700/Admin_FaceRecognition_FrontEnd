export const URL = {
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  LIST_USER: '/user/list',
  EDIT_USER: '/user/:id/edit',
  REGISTER_USER: '/user/register',
  LIST_USER_ATTENDANCE: 'attendance/list',
  ATTENDANCE_DETAIL: 'attendance/list/:id',
  ATTENDANCE_SALARY: 'salary/list',
  MESSAGE: 'messages',
}
export const FIRST_PAGE = 1
export const PER_PAGE = 30
export const FROM_PAGE = 0
export const TO_PAGE = 0
export const LAST_PAGE = 0
export const TOTAL_PAGE = 0
export const CURRENT_PAGE = 1

export const DEFAULT_PAGINATION_OBJECT = {
  currentPage: CURRENT_PAGE,
  lastPage: LAST_PAGE,
  totalPage: TOTAL_PAGE,
  perPage: PER_PAGE,
  from: FROM_PAGE,
  to: TO_PAGE,
}
