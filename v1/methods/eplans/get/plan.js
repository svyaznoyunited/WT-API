function main() {
  var planid = GPFR( 'planid' );
  if ( !planid ) {
    return { err: true, desc: 'planID is required!' }
  }

  var plan, steps, learnings;

  function newStep( data ) {
    return { step: data, learnings: [] }
  }

  var PLANOBJ = {};
  PLANOBJ.plan = {};
  PLANOBJ.steps = [];

  var SQL = "sql: ";
  SQL += "SELECT id, name, tech_name, access, expired_time, ISNULL( archived, 0 ) AS archived FROM wt_flat.dbo.education_plan "
  SQL += "WHERE id = " + SqlLiteral( planid );
  SQL += " AND ISNULL( archived, 0 ) = 0"

  PLANOBJ.plan = ArrayOptFirstElem( XQuery( SQL ), {} );
  if ( PLANOBJ.plan == {} ) {
    return { err: true, desc: 'No such plan.' }
  }

  SQL = "sql: ";
  SQL += "SELECT id, plan_id, name, expired_time, access, ISNULL( archived, 0 ) AS archived FROM wt_flat.dbo.education_plan_steps "
  SQL += "WHERE plan_id = " + SqlLiteral( planid );
  SQL += " AND ISNULL( archived, 0 ) = 0"
  steps = XQuery( SQL );

  for ( step in steps ) {
    PLANOBJ.steps.push( newStep( step ) );
  }

  for ( elem in PLANOBJ.steps ) {
    SQL = "sql: ";
    SQL += "SELECT id, step_id, CAST( education_id AS VARCHAR(30) ) AS education_id, education_type, expired_time, access, ISNULL( archived, 0 ) AS archived ";
    SQL += "FROM wt_flat.dbo.education_plan_step_learnings ";
    SQL += "WHERE step_id = " + SqlLiteral( elem.step.id );
    SQL += " AND ISNULL( archived, 0 ) = 0"
    elem.learnings = XQuery( SQL );
  }

  return PLANOBJ;

}

RESPONSE_OBJECT = main();
