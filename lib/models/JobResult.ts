// import mongoose, { Schema, models } from "mongoose";

// const JobResultSchema = new Schema(
//   {
//     jobTitle: { type: String, required: true },

//     escoOccupationUri: { type: String, required: true },
//     escoOccupationLabel: { type: String, required: true },

//     escoDescription: { type: String, default: "" },
//     escoSkills: [{ type: String }],
//     escoTasks: [{ type: String }],

//     refinedDescription: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// export const JobResult =
//   models.JobResult || mongoose.model("JobResult", JobResultSchema);


// updated with company name

import mongoose, { Schema, models } from "mongoose";

const JobResultSchema = new Schema(
  {
    jobTitle: { type: String, required: true },

    companyName: { type: String, default: "" }, // ✅ NEW

    escoOccupationUri: { type: String, required: true },
    escoOccupationLabel: { type: String, required: true },

    escoDescription: { type: String, default: "" },
    escoSkills: [{ type: String }],
    escoTasks: [{ type: String }],

    refinedDescription: { type: String, required: true },
  },
  { timestamps: true }
);

export const JobResult =
  models.JobResult || mongoose.model("JobResult", JobResultSchema);
