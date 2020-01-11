export function getAgeFromBirthdate(birthDateString) {
  const birthDate = new Date(birthDateString);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
