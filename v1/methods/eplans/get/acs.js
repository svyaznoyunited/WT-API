function main() {
  var SQL = "sql: ";
  SQL += "SELECT id AS val, name";
  SQL += " FROM wt_flat.dbo.access";
  SQL += " WHERE ISNULL( archived, 0 ) = 0";
  return XQuery( SQL );
}

RESPONSE_OBJECT = main();
