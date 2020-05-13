using BussinessLayer.BussinessModels;
using DataAccess.DataAccessModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Contracts
{
    public interface ICampService
    {
        void CreateCamp(CampBussiness campBussiness);
        List<CampBussiness> GetCampsFromDb();
        List<CampBussiness> GetCampsForDashboard();
        CampBussiness GetCampByIDFromDb(int id);
        List<CampBussiness> FilterCamps(DateTime checkInDate, DateTime checkOutDate,int capacity);
       
        void UpdateCamp(CampBussiness campBussiness, int id);
        CampBussiness DeleteCamp(int id);
        void UpdateCamp(CampBussiness campBussiness);
    }
}
