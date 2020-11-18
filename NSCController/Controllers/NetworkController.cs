using NSC.DAL.Database;
using NSC.DAL.Models;
using NSC.DAL.ViewModels;
using NSC.Service;
using NSC.Service.Services;
using NSCController.Resources;
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
    public class NetworkController : ApiController
    {
        private NetworkService _networkService;

        public NetworkController()
        {
            _networkService = new NetworkService();
        }

        [Route("api/networks")]
        public IHttpActionResult GetAll()
        {
            try
            {
                return Ok(_networkService.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest("Retrieve failed - " + ex.Message);
            }
        }

        [Route("api/networks")]
        public IHttpActionResult Post([FromBody] NetworkViewModel network)
        {
            try
            {
                return Ok(_networkService.Add(network));
            }
            catch (Exception ex)
            {
                return BadRequest("Creation failed - " + ex.Message);
            }
        }

        [Route("api/networks")]
        public IHttpActionResult Put([FromBody] NetworkViewModel network)
        {
            try
            {
                return Ok(_networkService.Update(network));
            }
            catch (Exception ex)
            {
                return BadRequest("Update failed - " + ex.Message);
            }
        }

        [Route("api/networks/{id}")]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                return Ok(_networkService.Delete(id));
            }
            catch (Exception ex)
            {
                return BadRequest("Delete failed - " + ex.Message);
            }
        }


    }
}
