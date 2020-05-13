export interface Booking
{
    Id : number
    TotalNights : number;
    NumberOfGuests : number
    CheckInDate: Date;
    CheckOutDate: Date;
    Country: string;
    Zipcode: number;
    Phone:number;
    BillingAddress:string;
    State:string;
    Amount:number;
    CampId:number;
    UserId:string;
    BookingReferenceNumber:string;    
}