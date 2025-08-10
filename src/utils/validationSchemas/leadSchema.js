import * as Yup from "yup";
import { commonFields } from "./commonFields";
export const leadValidationSchema = Yup.object({
  ...commonFields,
  requirement: Yup.string().required("Requirement is required"),
  budgetMin: Yup.number()
    .typeError("Must be a number")
    .required("Min budget required"),
  budgetMax: Yup.number()
    .typeError("Must be a number")
    .required("Max budget required"),
  location: Yup.string().required("Location is required"),
  propertyType: Yup.string().required("Property type is required"),
  followUpDate: Yup.date().required("Follow-up date is required"),
  source: Yup.string().required("Source is required"),
  notes: Yup.string(),
});
