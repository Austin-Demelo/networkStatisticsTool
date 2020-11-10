using NSC.DAL.Database;
using NSC.DAL.Models;
using NSC.DAL.ViewModels;
using NSC.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace NSCController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DeviceController : ApiController
    {
        private DeviceService _deviceService;

        public DeviceController()
        {
            _deviceService = new DeviceService();
        }

        [Route("api/devices")]
        public IHttpActionResult GetAll()
        {
            try
            {
                return Ok(_deviceService.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest("Retrieve failed - " + ex.Message);
            }
        }


        [Route("api/devices")]
        public IHttpActionResult Post([FromBody] DeviceViewModel device)
        {
            try
            {
                return Ok(_deviceService.Add(device));
            }
            catch (Exception ex)
            {
                return BadRequest("Creation failed - " + ex.Message);
            }
        }

        [Route("api/devices")]
        public IHttpActionResult Put([FromBody] DeviceViewModel device)
        {
            try
            {
                return Ok(_deviceService.Update(device));
            }
            catch (Exception ex)
            {
                return BadRequest("Update failed - " + ex.Message);
            }
        }

        [Route("api/devices/{id}")]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                return Ok(_deviceService.Delete(id));
            }
            catch (Exception ex)
            {
                return BadRequest("Delete failed - " + ex.Message);
            }
        }


    }
}