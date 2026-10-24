/**
 * Calcula la edad a partir de una fecha de nacimiento (YYYY-MM-DD o Date)
 */
export const calculateAge = (birthDate?: string | Date | null): number | null => {
  if (!birthDate) return null;

  try {
    const dob = new Date(birthDate);
    if (isNaN(dob.getTime())) return null;

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age >= 0 && age < 130 ? age : null;
  } catch {
    return null;
  }
};

export default calculateAge;
