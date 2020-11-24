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
    public class NetworkProblemController : ApiController
    {
        private NetworkProblemService _networkProblemService;

        public NetworkProblemController()
        {
            _networkProblemService = new NetworkProblemService();
        }

        [Route("api/networkproblems")]
        public IHttpActionResult GetAll()
        {
            try
            {
                return Ok(_networkProblemService.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest("Retrieve failed - " + ex.Message);
            }
        }

        [Route("api/networkproblems")]
        public IHttpActionResult Post([FromBody] NetworkProblemViewModel networkProblem)
        {
            try
            {
                return Ok(_networkProblemService.Add(networkProblem));
            }
            catch (Exception ex)
            {
                return BadRequest("Creation failed - " + ex.Message);
            }
        }

        [Route("api/networkproblems")]
        public IHttpActionResult Put([FromBody] NetworkProblemViewModel networkProblem)
        {
            try
            {
                return Ok(_networkProblemService.Update(networkProblem));
            }
            catch (Exception ex)
            {
                return BadRequest("Update failed - " + ex.Message);
            }
        }

        [Route("api/networkproblems/{id}")]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                return Ok(_networkProblemService.Delete(id));
            }
            catch (Exception ex)
            {
                return BadRequest("Delete failed - " + ex.Message);
            }
        }
    }
}