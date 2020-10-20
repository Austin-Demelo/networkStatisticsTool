using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;
using System.Data.Entity.Infrastructure;

namespace NSC_DAL
{
    public class NSCRepository<T> : IRepository<T> where T : NSCEntity
    {
        private NSCContext ctx = null;

        public NSCRepository(NSCContext context = null)
        {
            ctx = context != null ? context : new NSCContext();
        }

        public List<T> GetAll()
        {
            return ctx.Set<T>().ToList();
        }

        public List<T> GetByExpression(Expression<Func<T, bool>> lambdaExp)
        {
            return ctx.Set<T>().Where(lambdaExp).ToList();
        }

        public T Add(T entity)
        {
            ctx.Set<T>().Add(entity);
            ctx.SaveChanges();
            return entity;
        }

        public UpdateStatus Update(T updatedEntity)
        {
            UpdateStatus opStatus = UpdateStatus.Failed;

            try
            {
                NSCEntity currentEntity = GetByExpression(ent => ent.Id == updatedEntity.Id).FirstOrDefault();
                ctx.Entry(currentEntity).OriginalValues["Timer"] = updatedEntity.Timer;
                ctx.Entry(currentEntity).CurrentValues.SetValues(updatedEntity);
                if (ctx.SaveChanges() == 1) opStatus = UpdateStatus.Ok;
            }
            catch (DbUpdateConcurrencyException dbuex)
            {
                opStatus = UpdateStatus.Stale;
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + dbuex.Message);


            }
            catch (Exception ex)
            {
                //Compiler figures out the method name using the System.Reflection library
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }

            return opStatus;
        }

        public int Delete(int id)
        {
            T currentEntity = GetByExpression(ent => ent.Id == id).FirstOrDefault();
            ctx.Set<T>().Remove(currentEntity);
            return ctx.SaveChanges();
        }
    }
}
