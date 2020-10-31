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

namespace NSCController
{
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


    }
}
