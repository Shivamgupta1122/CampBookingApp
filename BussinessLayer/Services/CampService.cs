using BussinessLayer.BussinessModels;
using BussinessLayer.Contracts;
using BussinessLayer.MannualMap;
using DataAccess.DataAccessModels;
using DataAccess.DatabaseOperations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Services
{
   // CampOperations campOperations = new CampOperations();
    public class CampService : ICampService
    {
        CampOperations campOperations = new CampOperations();
        BussinesstoEntity bussinessToEntity = new BussinesstoEntity();
        EntitytoBussiness entitytoBussiness = new EntitytoBussiness();
        public void CreateCamp(CampBussiness campBussiness)
        {
            CampEntity campEntity = bussinessToEntity.CampBussinessToEntity(campBussiness);
            campOperations.CreateCamp(campEntity);
        }

        public void UpdateCamp(CampBussiness campBussiness)
        {
           CampEntity campEntity =  bussinessToEntity.CampBussinessToEntity(campBussiness);
           campOperations.UpdateCamp(campEntity);
        }

        public CampBussiness DeleteCamp(int id)
        {
            var isCampDeleted = campOperations.DeleteCamp(id);
            return entitytoBussiness.CampEntityToBussiness(isCampDeleted);
        }

        public List<CampBussiness> FilterCamps(DateTime checkInDate, DateTime checkOutDate, int capacity)
        {
            BookingOperations bookingOperations = new BookingOperations();
            CampOperations campOperations = new CampOperations();
            var bookedCamps = bookingOperations.campsBetween(checkInDate, checkOutDate);
            var nonBookedCamps = campOperations.GetFilteredCamps(bookedCamps, capacity);
            return nonBookedCamps.Select(camp => entitytoBussiness.CampEntityToBussiness(camp)).ToList();
        }
        public CampBussiness GetCampByIDFromDb(int id)
        {
            CampEntity campEntity = campOperations.GetCampByIDFromDb(id);
            return entitytoBussiness.CampEntityToBussiness(campEntity);
        }

        public List<CampBussiness> GetCampsFromDb()
        {
             var result = campOperations.GetCampsFromDb();
             var camps = entitytoBussiness.CampEntityToBussiness(result);
             return camps;
        }
        public List<CampBussiness> GetCampsForDashboard()
        {
            var result = campOperations.GetCampsForDashboard();
            var camps = entitytoBussiness.CampEntityToBussiness(result);
            return camps;
        }

        public void UpdateCamp(CampBussiness campBussiness, int id)
        {
            throw new NotImplementedException();
        }
    }
}
