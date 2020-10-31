using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace NSC.DAL.Repository
{
    public interface INSCRepository<T>
    {
        List<T> GetAll();
        List<T> GetByExpression(Expression<Func<T, bool>> lambdaExp);
        T Add(T entity);
        UpdateStatus Update(T entity);
        int Delete(int i);
    }
}
