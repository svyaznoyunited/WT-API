function main() {
  var resid = GPFR( 'resid' );
  if ( !resid ) {
    return { err: true, desc: 'resID is required!' }
  }

  function newStep( data ) {
    return { step: data, learnings: [] }
  }

  var PLANOBJ = {};
  PLANOBJ.plan = {};
  PLANOBJ.steps = [];

  var SQL = "sql: ";
  SQL += "SELECT ep.name, epr.* ";
  SQL += "FROM wt_flat.dbo.education_plan_result epr ";
  SQL += "JOIN wt_flat.dbo.education_plan ep ON epr.plan_id = ep.id "
  SQL += "WHERE ISNULL(ep.archived, 0) = 0 "
  SQL += "AND epr.id = " + SqlLiteral( resid );

  PLANOBJ.plan = ArrayOptFirstElem( XQuery( SQL ), {} );
  if ( PLANOBJ.plan == {} ) {
    return { err: true, desc: 'No such plan.' }
  }
  SQL = "sql: ";
  SQL += "SELECT eps.name, eprs.* ";
  SQL += "FROM wt_flat.dbo.education_plan_result_steps eprs ";
  SQL += "	JOIN wt_flat.dbo.education_plan_steps eps ON eprs.step_id = eps.id ";
  SQL += "WHERE ISNULL(eps.archived, 0) = 0 AND result_id = " + SqlLiteral( resid );
  steps = XQuery( SQL );

  for ( step in steps ) {
    PLANOBJ.steps.push( newStep( step ) );
  }

  for ( elem in PLANOBJ.steps ) {
    SQL = "sql: ";
    SQL += "SELECT ";
    SQL += "CAST( epsl.education_id AS VARCHAR(30)) AS education_id";
    SQL += ",CAST( eprsl.assigned_education AS VARCHAR(30)) AS assigned_education";
    SQL += ",CAST( eprsl.result_education AS VARCHAR(30)) AS result_education";
    SQL += ",eprsl.id";
    SQL += ",eprsl.result_step_id";
    SQL += ",eprsl.step_learning_id";
    SQL += ",eprsl.education_type";
    SQL += ",eprsl.state";
    SQL += ",eprsl.expire_date ";
    SQL += "FROM wt_flat.dbo.education_plan_result_step_learnings eprsl ";
    SQL += "JOIN wt_flat.dbo.education_plan_step_learnings epsl ON eprsl.step_learning_id = epsl.id ";
    SQL += "WHERE ISNULL(epsl.archived, 0) = 0 ";
    SQL += "AND eprsl.result_step_id = " + SqlLiteral( elem.step.id );
    elem.learnings = XQuery( SQL );
  }

  return PLANOBJ;

}

RESPONSE_OBJECT = main();
