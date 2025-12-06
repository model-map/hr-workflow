import { ValidateStartNodeType } from "@/types/validation.types";

type validateType = {
  data?: ValidateStartNodeType;
};

export default async function validateStartNode(data: ValidateStartNodeType) {
  if (!data) {
    return "startNode ";
  }
}
