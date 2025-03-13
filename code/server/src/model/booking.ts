import  type User from "./user.js";
import  type Workshop from "./workshop.js";

type Booking= {
    id: number;
    datetime:string;
    address: string;
    user_id: number;
    user: User;
    workshop_id: number;
    workshop: Workshop;
};

export default Booking;