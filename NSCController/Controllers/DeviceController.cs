using NSC.DAL.Database;
using NSC.DAL.Models;
using NSC.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NSCController
{
    public class DeviceController : ApiController
    {
        private DeviceModel _deviceModel;

        public DeviceController()
        {
            _deviceModel = new DeviceModel();
        }

        [Route("api/devices")]
        public IHttpActionResult GetAll()
        {
            try
            {
                List<DeviceViewModel> deviceViewModels = new List<DeviceViewModel>();
                foreach (Device device in _deviceModel.GetAll())
                {
                    deviceViewModels.Add(new DeviceViewModel()
                    {
                        Id = device.Id,
                        DeviceName = device.DeviceName,
                        //User = device.User//,
                        //NetworkInterfaces = device.NetworkInterfaces,
                        //NetworkStatTests = device.NetworkStatTests
                    });
                }
                return Ok(deviceViewModels);
            }
            catch (Exception ex)
            {
                return BadRequest("Retrieve failed - " + ex.Message);
            }
        }

    }
}