using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using NSCViewModels;

namespace NSCController
{
    public class NetworkController : ApiController
    {
        [Route("api/networks")]
        public IHttpActionResult GetAll()
        {
            try
            {
                NetworkViewModel network = new NetworkViewModel();
                List<NetworkViewModel> allNetworks = network.GetAll();
                return Ok(allNetworks);
            }
            catch (Exception ex)
            {
                return BadRequest("Retrieve failed - " + ex.Message);
            }
        }
    }
}
