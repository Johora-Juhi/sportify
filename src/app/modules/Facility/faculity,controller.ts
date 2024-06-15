import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync";
import SendResponse from "../../utils/sendResponse";
import { FacilityServices } from "./facility.services";

const createFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.createFacilityIntoDB(req.body);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facilty created successfully",
    data: result,
  });
});

export const FacilityController = {
  createFacility,
};
