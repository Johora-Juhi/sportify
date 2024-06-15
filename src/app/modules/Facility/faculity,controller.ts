import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync";
import SendResponse from "../../utils/sendResponse";
import { FacilityServices } from "./facility.services";

const createFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.createFacilityIntoDB(req.body);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility created successfully",
    data: result,
  });
});

const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityServices.updateFacilityIntoDB(id, req.body);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility updated successfully",
    data: result,
  });
});

const deleteFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityServices.deleteFacilityFromDB(id);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility deleted successfully",
    data: result,
  });
});
const getAllFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.getAllFacilityFromDB();
  if (result.length) {
    SendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Facility retrieved successfully",
      data: result,
    });
  } else {
    SendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No data found!",
      data: result,
    });
  }
});

export const FacilityController = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacility,
};
