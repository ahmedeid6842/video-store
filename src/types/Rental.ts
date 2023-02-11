import { createRentalInput } from "../validators/rental";
import { createCustomerInput } from "../validators/customer";
import { createMovieInput } from "../validators/movie";

export type Rental = createRentalInput & {
  dateout: Date;
  datereturned: Date;
  rentalFee: number;
} & createCustomerInput &
  createMovieInput;
