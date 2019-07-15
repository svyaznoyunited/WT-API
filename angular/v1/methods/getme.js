function main(){
  var SQL = 'sql: ';
      SQL += 'SELECT * FROM collaborators WHERE id = ' + Request.AuthUserID
  return XQuery( SQL );
}
RESPONSE_OBJECT = main();
