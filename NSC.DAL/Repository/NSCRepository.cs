using NSC.DAL.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace NSC.DAL.Repository
{
    public class NSCRepository<T> : INSCRepository<T> where T : NSCEntity
    {
        private NSCContext _ctx = null;

        public NSCRepository(NSCContext context = null)
        {
            _ctx = context != null ? context : new NSCContext();
        }

        public List<T> GetAll()
        {
            return _ctx.Set<T>().ToList();
        }

        public List<T> GetByExpression(Expression<Func<T, bool>> lambdaExp)
        {
            return _ctx.Set<T>().Where(lambdaExp).ToList();
        }
        public T Add(T entity)
        {
            _ctx.Set<T>().Add(entity);
            _ctx.SaveChanges();
            return entity;
        }

        public UpdateStatus Update(T updatedEntity)
        {
            UpdateStatus opStatus = UpdateStatus.Failed;

            try
            {
                NSCEntity currentEntity = GetByExpression(ent => ent.Id == updatedEntity.Id).FirstOrDefault();
                _ctx.Entry(currentEntity).OriginalValues["Timer"] = updatedEntity.Timer;
                _ctx.Entry(currentEntity).CurrentValues.SetValues(updatedEntity);
                if (_ctx.SaveChanges() == 1)
                {
                    opStatus = UpdateStatus.Ok;
                }
            }
            catch (DbUpdateConcurrencyException dbx)
            {
                opStatus = UpdateStatus.Stale;
                Console.WriteLine("Problem in " + MethodBase.GetCurrentMethod().Name + dbx.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + MethodBase.GetCurrentMethod().Name + ex.Message);
            }
            return opStatus;
        }

        public int Delete(int id)
        {
            T currentEntity = GetByExpression(ent => ent.Id == id).FirstOrDefault();
            _ctx.Set<T>().Remove(currentEntity);
            return _ctx.SaveChanges();
        }

    }
}
