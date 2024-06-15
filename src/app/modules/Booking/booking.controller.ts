import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync";
import SendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.services";

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.user, req.body);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingFromDB();

  if (result.length) {
    SendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Bookings retrieved successfully",
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

const getAllBookingForUser = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingForUserFromDB(req.user);

  if (result.length) {
    SendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Bookings retrieved successfully",
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

const deleteBookingForUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.deleteBookingForUserFromDB(id);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings cancelled successfully",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBooking,
  getAllBookingForUser,
  deleteBookingForUser,
};
