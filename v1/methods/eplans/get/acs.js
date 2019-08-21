function main() {
  var SQL = "sql: ";
  SQL += "SELECT CAST( id AS VARCHAR(30) ) AS val, name"
  SQL += " FROM groups"
  SQL += " WHERE CAST( role_id AS VARCHAR(MAX) ) LIKE '%6725377697535911760%'"
  return XQuery( SQL );
}

RESPONSE_OBJECT = main();
