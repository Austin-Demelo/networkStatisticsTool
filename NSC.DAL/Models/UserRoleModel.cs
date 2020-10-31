using NSC.DAL.Database;
using NSC.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Reflection;

namespace NSC.DAL.Models
{
    public class UserRoleModel
    {
        private INSCRepository<UserRole> _repo;

        public UserRoleModel(NSCContext ctx = null)
        {
            _repo = new NSCRepository<UserRole>(ctx);
        }

        public List<UserRole> GetAll()
        {
            List<UserRole> selectedUserRoles = null;
            try
            {
                selectedUserRoles = _repo.GetAll();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return selectedUserRoles;
        }

        public UserRole GetById(int id)
        {
            List<UserRole> selectedUserRoles = null;
            try
            {
                selectedUserRoles = _repo.GetByExpression(userRole => userRole.Id == id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return selectedUserRoles.FirstOrDefault();
        }

        public int Add(UserRole newUserRole)
        {
            try
            {
                newUserRole = _repo.Add(newUserRole);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return newUserRole.Id;
        }

        public UpdateStatus Update(UserRole updatedUserRole)
        {
            UpdateStatus opStatus = UpdateStatus.Failed;
            try
            {
                opStatus = _repo.Update(updatedUserRole);
            }
            catch (DbUpdateConcurrencyException dbuex)
            {
                opStatus = UpdateStatus.Stale;
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + dbuex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return opStatus;
        }

        public int Delete(int id)
        {
            int deletedUserRoles = -1;
            try
            {
                deletedUserRoles = _repo.Delete(id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return deletedUserRoles;
        }
    }
}
