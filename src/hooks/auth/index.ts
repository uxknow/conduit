export const useAuth = () => {
  return !!localStorage.getItem('jwt')
}