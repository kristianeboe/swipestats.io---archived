import * as md5 from "md5";

function anonymizeConversations(conversations) {
  return conversations.map(({ match_id, messages }) => ({
    match_id,
    messages: messages.map(({ message, ...messageMeta }) => messageMeta)
  }));
}

function getSecretId(tinderData) {
  const secretId = md5(
    tinderData.User.email +
      tinderData.User.username +
      tinderData.User.create_date
  );

  return secretId;
}

export default function(tinderData) {
  const anonymizedConversations = anonymizeConversations(tinderData.Messages);
  const secretId = getSecretId(tinderData);

  const jobsWithoutCompanies = tinderData.User.jobs.map(
    ({ company, title }) => ({
      companyDisplayed: company ? company.displayed : false,
      // company: company.name // demmed to sensitive
      titleDisplayed: title ? title.displayed : false,
      title: title ? title.nam : false
    })
  );
  // schools are deemed anonymus enough for collection

  return {
    userId: secretId,
    user: {
      birthDate: tinderData.User.birth_date,
      ageFilterMin: tinderData.User.age_filter_min,
      ageFilterMax: tinderData.User.age_filter_max,
      cityName: tinderData.User.city.name,
      country: tinderData.User.city.region,
      createDate: tinderData.User.create_date,
      education: tinderData.User.education,
      gender: tinderData.User.gender,
      interestedIn: tinderData.User.interested_in,
      genderFilter: tinderData.User.gender_filter,
      instagram: tinderData.User.instagram
        ? !!tinderData.User.instagram.username
        : false,
      spotify: tinderData.Spotify.spotify_connected,
      jobs: jobsWithoutCompanies,
      educationLevel: tinderData.User.education,
      schools: tinderData.User.schools
    },
    swipeLikes: tinderData.Usage.swipes_likes,
    swipePasses: tinderData.Usage.swipes_passes,
    swipes: {
      likes: tinderData.Usage.swipes_likes,
      passes: tinderData.Usage.swipes_passes
    },
    matches: tinderData.Usage.matches,
    messagesSent: tinderData.Usage.messages_sent,
    messagesReceived: tinderData.Usage.messages_received,
    messages: {
      sent: tinderData.Usage.messages_sent,
      received: tinderData.Usage.messages_received
    },
    conversations: anonymizedConversations,
    //messages: tinderData.Messages,
    appOpens: tinderData.Usage.app_opens
  };
}
