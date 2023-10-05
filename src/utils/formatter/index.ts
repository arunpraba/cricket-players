export const getAgeFromDob = (dob: number): number => {
  const date = new Date(dob)
  const ageDifMs = Date.now() - date.getTime()
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}
