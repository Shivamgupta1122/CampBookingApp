﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace CampBookingApp.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public string BookingReferenceNumber { get; set; }
        [Column(TypeName = "date")]
        public DateTime CheckInDate { get; set; }
        [Column(TypeName = "date")]
        public DateTime CheckOutDate { get; set; }
        public int TotalNights { get; set; }
        public string BillingAddress { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string Country { get; set; }
        public int ZipCode { get; set; }
        public int FinalAmount { get; set; }       //Final Amount to be taken from User after finalizing number of nights i.e., FinalAmount = TotalNights * Price of Camp* Number of guests
        public long CellPhone { get; set; }
        public int NumberOfGuests { get; set; }
        public int CampId { get; set; }
        public int UserId { get; set; }
        public virtual Camp Camp { get; set; }
        public virtual User Account { get; set; }





    }
}