// Define the GraphQL schema for the MLH Fellowship API
const typeDefs = `#graphql
  type MLHFellowship {
    id: ID!
    resume: Boolean
    github: Boolean
    linkedin: Boolean
    portfolio: Boolean
    country: String
    workingCountry: String
    workPermit: String
    program: String
    term: String
    availableTimeBlocks: [String]
    isStudent: Boolean
    institutionName: String
    currentInstitutionType: String
    expectedGraduationMonth: String
    expectedGraduationYear: String
    major: String
    credentialType: String
    lookingForCodingJob: String
    jobStartTiming: String
    openToRemoteWork: Boolean
    programmingLanguages: String
    experiences: String
    interests: [String]
    codeSampleGitHubURL: String
    codeSampleLanguage: String
    codeSampleDescription: String
    codeSampleLearning: String
    whyMLHFellowship: String
    communityPerspective: String
    additionalInfo: String
    pronouns: String
    gender: String
    ethnicity: String
    underrepresentedGroup: String
    fellowshipSource: String
  }

  input MLHFellowshipInput {
    resume: Boolean
    github: Boolean
    linkedin: Boolean
    portfolio: Boolean
    country: String
    workingCountry: String
    workPermit: String
    program: String
    term: String
    availableTimeBlocks: [String]
    isStudent: Boolean
    institutionName: String
    currentInstitutionType: String
    expectedGraduationMonth: String
    expectedGraduationYear: String
    major: String
    credentialType: String
    lookingForCodingJob: String
    jobStartTiming: String
    openToRemoteWork: Boolean
    programmingLanguages: String
    experiences: String
    interests: [String]
    codeSampleGitHubURL: String
    codeSampleLanguage: String
    codeSampleDescription: String
    codeSampleLearning: String
    whyMLHFellowship: String
    communityPerspective: String
    additionalInfo: String
    pronouns: String
    gender: String
    ethnicity: String
    underrepresentedGroup: String
    fellowshipSource: String
  }

  extend type Query {
    getMLHFellowship(id: ID!): MLHFellowship
    getAllMLHFellowships: [MLHFellowship]
  }

  extend type Mutation {
    createMLHFellowship(input: MLHFellowshipInput!): MLHFellowship
    updateMLHFellowship(id: ID!, input: MLHFellowshipInput!): MLHFellowship
    deleteMLHFellowship(id: ID!): ID
  }
`;

export default typeDefs;
