export default {
  meEndpoint: '/users/me',
  loginEndpoint: '/users/log-in',
  registerEndpoint: '/users/sign-up',
  addJobEndPoint: '/interviewer/create',
  getJobsEndpPoint: '/interviewer',
  getInterviewer: (id: string) => `/interviewer/${id}`,
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken', // logout | refreshToken
  addQuestion: '/questions'
}
