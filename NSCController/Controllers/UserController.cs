﻿using NSC.DAL.Database;
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

        [Route("api/user")]
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

        [Route("api/user")]
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
        [HttpPost]
        [Route("api/user/register")]
        public IHttpActionResult Register([FromBody] UserViewModel user)
        {
            try
            {
                return Ok(_userService.Register(user));
            }
            catch (Exception ex)
            {
                return BadRequest("Creation failed - " + ex.Message);
            }
        }

        [HttpGet]
        [Route("api/user/key/{key}")]
        public IHttpActionResult ValidateUser(string key)
        {
            try
            {
                return Ok(_userService.ValidateUser(key));
            }
            catch (Exception ex)
            {
                return BadRequest("Creation failed - " + ex.Message);
            }
        }

        [Route("api/user")]
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

        [Route("api/user/{id}")]
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
        [HttpPost]
        [Route("api/login")]
        public IHttpActionResult Delete([FromBody] UserViewModel user)
        {
            try
            {
                return Ok(_userService.Login(user.UserName, user.UserPass));
            }
            catch (Exception ex)
            {
                return BadRequest("Delete failed - " + ex.Message);
            }
        }


    }
}