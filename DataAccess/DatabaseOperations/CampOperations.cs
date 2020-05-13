using DataAccess.DataAccessModels;
using DataAccess.DataBaseContext;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DatabaseOperations
{
    public class CampOperations
    {
        CampBookingContext context = new CampBookingContext();
        /// <summary>
        /// creates the camp
        /// </summary>
        /// <param name="campEntity"></param>
        public void CreateCamp(CampEntity campEntity)
        {
            try
            {
                context.Camps.Add(campEntity);
               context.SaveChanges();
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
        //Deletes the camp with Id equals campId
        public CampEntity DeleteCamp(int campId)
        {
                var requiredCamp = GetCampByIDFromDb(campId);
                BookingOperations bookingOperations = new BookingOperations();
                if (requiredCamp != null)
                {
                    try
                    {
                        //Here, it checks if the camp to be deleted is booked or not.Here, Entity State will have a value Detached for camps which are booked
                        if (context.Entry(requiredCamp).State == System.Data.Entity.EntityState.Detached)
                        {
                            bookingOperations.removeBookingByCampId(campId);
                            context.Camps.Attach(requiredCamp);
                            context.Camps.Remove(requiredCamp);
                         
                        }
                        else
                    {
                        context.Camps.Remove(requiredCamp);
                    }
                    context.SaveChanges();
                }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                    return requiredCamp;
                }

                else
                {
                    return null;
                }
            
        }
        //Get the camp with Id equals id
        public  CampEntity GetCampByIDFromDb(int id)
        {
            return context.Camps.FirstOrDefault(x => x.Id == id);
        }

        //This method will return all the camps which will be shown to the user on the dashboard
        public List<CampEntity> GetCampsForDashboard()
        {
            var pastBookings = context.Bookings.Where(booking => booking.CheckOutDate < DateTime.Now);          //returns bookings for which checkoutdate has been passed
            var presentBookings = context.Bookings.Where(booking => booking.CheckInDate.CompareTo(DateTime.Today) == 0);    //returns bookings for which checkin dates have the today date
            var campsBookedinpast = new List<CampEntity>();
            var campsBookedToday = new List<CampEntity>();
            foreach (var booking in pastBookings)                                          //Here, we will get all the camps for the past bookings
            {
                campsBookedinpast.Add(GetCampByIDFromDb(booking.CampId));
            }
            foreach (var booking in presentBookings)                                       //Here, we will get all the camps for the present date bookings
            {
                campsBookedToday.Add(GetCampByIDFromDb(booking.CampId));
            }
            foreach (var camp in campsBookedinpast)                                        //Sets the IsActive flag to true for the camps for which checkoutdate is passed
            {  
                if(!camp.IsActive)
                {
                    camp.IsActive = true;
                }
            }
            foreach (var camp in campsBookedToday)                                        //Sets the isActive flag to false for the camps for which booking starts today
            {
                if (camp.IsActive)
                {
                    camp.IsActive = false;
                }
            }
            context.SaveChanges();                                                        //save all the above changes first in db
            List<CampEntity> camps = (from camp in context.Camps where camp.IsActive == true      // Now, list will contain all the camps which are active for booking only
                                select camp).ToList();
            return camps;
        }
        //Returns all camps stored in db whether booked or not(for Admin)
        public List<CampEntity> GetCampsFromDb()
        {
            List<CampEntity> camps = (from camp in context.Camps
                                      select camp).ToList();
            return camps;
        }
        //Updates the desired camp 
        public void UpdateCamp(CampEntity campEntity)
        {
                var requiredCamp = GetCampByIDFromDb(campEntity.Id);  //Get the specifed camp to be updated from db
                requiredCamp.ImageURL = campEntity.ImageURL;          //set data to be updated
                requiredCamp.Id = campEntity.Id;
                requiredCamp.IsActive = campEntity.IsActive;
                requiredCamp.Title = campEntity.Title;
                requiredCamp.PriceforWeekdays = campEntity.PriceforWeekdays;
                requiredCamp.PriceforWeekends = campEntity.PriceforWeekends;
                requiredCamp.Capacity = campEntity.Capacity;
                requiredCamp.Description = campEntity.Description;
                    if (context.Entry(requiredCamp).State == System.Data.Entity.EntityState.Detached)  //if the camp to be updated is booked, then set the camp properties to the requiredcamp
                    {
                        context.Camps.Attach(requiredCamp);
                    }
                    else
                    {
                        context.Entry(requiredCamp).CurrentValues.SetValues(campEntity);               //else update the camp in camp table with new campEntity
                    }
                    context.Entry(requiredCamp).State = System.Data.Entity.EntityState.Modified;       //Change the state of the updated camp entry of camp table to the Modified State
                    context.SaveChanges();
        }
        //Get those entries from Camps table which are not booked and has a specified capacity
        public List<CampEntity> GetFilteredCamps(List<int> bookedCamps, int capacity)
        {
            List<CampEntity> availableCamps = new List<CampEntity>();
            using (var context = new CampBookingContext())
            {
                return context.Camps.Where(s => !bookedCamps.Contains(s.Id) && s.Capacity == capacity).ToList();
            }
        }
    }
}
