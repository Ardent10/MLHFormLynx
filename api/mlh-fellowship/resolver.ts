import { Collection, ObjectId } from "mongodb";

interface MLHFellowship {
  id: string;
  resume: boolean;
  github: boolean;
  linkedin: boolean;
  portfolio: boolean;
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

interface MLHFellowshipInput {
  resume: boolean;
  github: boolean;
  linkedin: boolean;
  portfolio: boolean;
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

const mlhFellowshipResolver = {
  Query: {
    getMLHFellowshipForm: async (
      _parent: any,
      { id }: { id: string },
      { mlhFellowshipCollection }: { mlhFellowshipCollection: Collection }
    ) => {
      const fellowship = await mlhFellowshipCollection.findOne({
        _id: new ObjectId(id),
      });
      return fellowship ? fellowship : null;
    },
    getAllMLHFellowshipsForm: async (
      _parent: any,
      _args: any,
      { mlhFellowshipCollection }: { mlhFellowshipCollection: Collection }
    ) => {
      const fellowships = await mlhFellowshipCollection.find({}).toArray();
      return fellowships;
    },
  },
  Mutation: {
    createMLHFellowshipForm: async (
      _parent: any,
      { input }: { input: MLHFellowshipInput },
      { mlhFellowshipCollection }: { mlhFellowshipCollection: Collection }
    ) => {
      const newFellowship: MLHFellowship = {
        id: "some_generated_id", // You can generate a new ID here
        ...input,
      };
      await mlhFellowshipCollection.insertOne(newFellowship);
      return newFellowship;
    },
    updateMLHFellowshipForm: async (
      _parent: any,
      { id, input }: { id: string; input: MLHFellowshipInput },
      { mlhFellowshipCollection }: { mlhFellowshipCollection: Collection }
    ) => {
      await mlhFellowshipCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: input }
      );
      const updatedFellowship = await mlhFellowshipCollection.findOne({
        _id: new ObjectId(id),
      });
      return updatedFellowship ? updatedFellowship : null;
    },
    deleteMLHFellowshipForm: async (
      _parent: any,
      { id }: { id: string },
      { mlhFellowshipCollection }: { mlhFellowshipCollection: Collection }
    ) => {
      await mlhFellowshipCollection.deleteOne({ _id: new ObjectId(id) });
      return id;
    },
  },
};

export default mlhFellowshipResolver;
