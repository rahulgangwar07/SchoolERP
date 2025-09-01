using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace SchoolERP.Server.Models
{
    public class Common
    {
        private readonly SchoolERPContext _context;

        public Common(SchoolERPContext context)
        {
            _context = context;
        }

        public DataTable ExecuteQuery(string proc, Dictionary<string, object> parameters)
        {
            var dataTable = new DataTable();
            using (var connection = new SqlConnection(_context.Database.GetConnectionString()))
            {
                using (var command = new SqlCommand(proc, connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    foreach (var param in parameters)
                    {
                        command.Parameters.AddWithValue(param.Key, param.Value ?? DBNull.Value);
                    }

                    using (var adapter = new SqlDataAdapter(command))
                    {
                        adapter.Fill(dataTable);
                    }
                }
            }

            return dataTable;
        }

        public DataTable ExecuteQuery(string proc, Dictionary<string, string> parameters)
        {
            var dataTable = new DataTable();
            using (var connection = new SqlConnection(_context.Database.GetConnectionString()))
            {
                using (var command = new SqlCommand(proc, connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    foreach (var param in parameters)
                    {
                        command.Parameters.AddWithValue(param.Key, param.Value);
                    }

                    using (var adapter = new SqlDataAdapter(command))
                    {
                        adapter.Fill(dataTable);
                    }
                }
            }

            return dataTable;

        }

        public DataTable ExecuteQuery(string proc, Dictionary<string, int> parameters)
        {
            var dataTable = new DataTable();
            using (var connection = new SqlConnection(_context.Database.GetConnectionString()))
            {
                using (var command = new SqlCommand(proc, connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    foreach (var param in parameters)
                    {
                        command.Parameters.AddWithValue(param.Key, param.Value);
                    }
                    using (var adapter = new SqlDataAdapter(command))
                    {
                        adapter.Fill(dataTable);
                    }
                }
            }
            return dataTable;
        }

        public DataSet ExecuteQueryDataSet(string proc, Dictionary<string, string> parameters)
        {
            var dataSet = new DataSet();
            using (var connection = new SqlConnection(_context.Database.GetConnectionString()))
            {
                using (var command = new SqlCommand(proc, connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    foreach (var param in parameters)
                    {
                        command.Parameters.AddWithValue(param.Key, param.Value);
                    }
                    using (var adapter = new SqlDataAdapter(command))
                    {
                        adapter.Fill(dataSet);
                    }
                }
            }
            return dataSet;

        }



    }
}
