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

namespace NSCController.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        private UserService _userService;

        public UserController()
        {
            _userService = new UserService();
        }

        [Route("api/team")]
        public IHttpActionResult GetAll()
        {
            try
            {
                return Ok(_userService.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest("Retrieve failed - " + ex.Message);
            }
        }

        [Route("api/team")]
        public IHttpActionResult Post([FromBody] UserViewModel user)
        {
            try
            {
                return Ok(_userService.Add(user));
            }
            catch (Exception ex)
            {
                return BadRequest("Creation failed - " + ex.Message);
            }
        }

        [Route("api/team")]
        public IHttpActionResult Put([FromBody] UserViewModel user)
        {
            try
            {
                return Ok(_userService.Update(user));
            }
            catch (Exception ex)
            {
                return BadRequest("Update failed - " + ex.Message);
            }
        }

        [Route("api/team/{id}")]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                return Ok(_userService.Delete(id));
            }
            catch (Exception ex)
            {
                return BadRequest("Delete failed - " + ex.Message);
            }
        }


    }
}