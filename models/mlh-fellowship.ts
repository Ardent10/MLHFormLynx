import mongoose, { Document, Schema } from "mongoose";

interface IMLHFellowship extends Document {
  resume: string;
  github: string;
  linkedin: string;
  portfolio: string;
  country: string;
  workingCountry: string;
  workPermit: string;
  program: string;
  term: string;
  availableTimeBlocks: string[];
  isStudent: boolean;
  institutionName: string;
  currentInstitutionType: string;
  expectedGraduationMonth: string;
  expectedGraduationYear: string;
  major: string;
  credentialType: string;
  lookingForCodingJob: string;
  jobStartTiming: string;
  openToRemoteWork: boolean;
  programmingLanguages: string;
  experiences: string;
  interests: string[];
  codeSampleGitHubURL: string;
  codeSampleLanguage: string;
  codeSampleDescription: string;
  codeSampleLearning: string;
  whyMLHFellowship: string;
  communityPerspective: string;
  additionalInfo: string;
  pronouns: string;
  gender: string;
  ethnicity: string;
  underrepresentedGroup: string;
  fellowshipSource: string;
}

const MLHFellowshipSchema: Schema<IMLHFellowship> = new mongoose.Schema(
  {
    resume: String,
    github: String,
    linkedin: String,
    portfolio: String,
    country: String,
    workingCountry: String,
    workPermit: String,
    program: String,
    term: String,
    availableTimeBlocks: [String],
    isStudent: Boolean,
    institutionName: String,
    currentInstitutionType: String,
    expectedGraduationMonth: String,
    expectedGraduationYear: String,
    major: String,
    credentialType: String,
    lookingForCodingJob: String,
    jobStartTiming: String,
    openToRemoteWork: Boolean,
    programmingLanguages: String,
    experiences: String,
    interests: [String],
    codeSampleGitHubURL: String,
    codeSampleLanguage: String,
    codeSampleDescription: String,
    codeSampleLearning: String,
    whyMLHFellowship: String,
    communityPerspective: String,
    additionalInfo: String,
    pronouns: String,
    gender: String,
    ethnicity: String,
    underrepresentedGroup: String,
    fellowshipSource: String,
  },
  { timestamps: true }
);

const MLHFellowship = mongoose.model<IMLHFellowship>(
  "MLHFellowship",
  MLHFellowshipSchema
);

export default MLHFellowship;
