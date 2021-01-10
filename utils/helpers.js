function subtractYear(dateString) {
  // yyyy-mm-dd
  const [year, month, day] = dateString.split("-");
  // const year = parseInt(dateString.slice(0,4))
  const lastYear = parseInt(year) - 1;

  return [lastYear, month, day].join("-");
}

function duplicateAndShiftSection(profile, profileKey) {
  return Object.entries(profile[profileKey]).reduce(
    (acc, [date, val]) => ({ ...acc, [subtractYear(date)]: val }),
    {}
  );
}

export function duplicateProfile(profile) {
  const duplicateProfile = { ...profile };

  duplicateProfile["appOpens"] = duplicateAndShiftSection(profile, "appOpens");
  duplicateProfile["matches"] = duplicateAndShiftSection(profile, "matches");

  return duplicateProfile;
}
