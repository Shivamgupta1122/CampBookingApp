using BussinessLayer;
using BussinessLayer.BussinessModels;
using BussinessLayer.Contracts;
using BussinessLayer.Services;
using CampBookingApp.ModelMapper;
using CampBookingApp.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace CampBookingApp.Controllers
{
   [RoutePrefix("api/Camp")]
    public class CampController : ApiController
    {
        ICampService campService = new ServiceFactory().GetCampService();
        BussinessModeltoModel bussinessModeltoModel = new BussinessModeltoModel();
        ModeltoBussinessModel modeltoBussiness = new ModeltoBussinessModel();
        [HttpGet]
        [Route("AllDashboardCamps")]
        public IHttpActionResult GetCampsForDashboard()
        {
            var campList = campService.GetCampsForDashboard();
            var result = bussinessModeltoModel.CampBussinesstoModel(campList);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);

        }
        [HttpGet]
        [Route("AllCampDetails")]
        public IHttpActionResult GetCampsFromDb()
        {
            var campList = campService.GetCampsFromDb();
            var result = bussinessModeltoModel.CampBussinesstoModel(campList);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        // GET: api/Camp/5
        [HttpGet]
        [Route("GetCampDetailsById/{CampId}")]
        public IHttpActionResult GetCampById(int CampId)
        {
            var result = new Camp();
            try
           {   
                CampBussiness campBussiness = campService.GetCampByIDFromDb(CampId);
                result = bussinessModeltoModel.CampBussinesstoModel(campBussiness);
                if(result == null)
                {
                    return NotFound();
                }
            }
            catch(Exception)
            {
                throw;
            }
            return Ok(result);
        }

        // POST: api/Camp
         [HttpPost]
         [Route("CreateCamp")]
         public IHttpActionResult CreateCamp(Camp camp)
         {
             camp.IsActive = true;
             CampBussiness campBussiness = modeltoBussiness.CamptoCampBussiness(camp);

             try
             {
                 campService.CreateCamp(campBussiness);
                 return Ok(camp);
             }
             catch (Exception)
             {
                 throw;
             }

         }

        // PUT: api/Camp/5
        [HttpPut]

        [Route("UpdateCamp")]

        public IHttpActionResult PutUpdateCamp(Camp camp)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
               CampBussiness campBussiness = modeltoBussiness.CamptoCampBussiness(camp);
                campService.UpdateCamp(campBussiness);
            return Ok(camp);
        }
        // DELETE: api/Camp/5
        [Route("GetCampsBetween/{checkinDate}/{checkOutDate}/{capacity}")]
        public List<Camp> GetCampsBetween(DateTime checkinDate, DateTime checkOutDate, int capacity)
        {
            try
            {
                var result =  campService.FilterCamps(checkinDate, checkOutDate, capacity);
               return bussinessModeltoModel.CampBussinesstoModel(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpDelete]
        [Route("DeleteCamp/{campId}")]
        public IHttpActionResult DeleteCamp(int campId)
        {
            var isCampDeleted = campService.DeleteCamp(campId);
            if (isCampDeleted == null)
            {
                return NotFound();
            }
            return Ok(isCampDeleted);
        }
    }
}
