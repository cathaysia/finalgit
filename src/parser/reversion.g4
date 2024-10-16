// ex: set ft=antlr:
// https://git-scm.com/docs/revisions#Documentation/revisions.txt
// https://git-scm.com/docs/git-rev-list/zh_HANS-CN
grammar reversion;
import reversionRules;
@header {
    // @ts-ignore
}

reversion: rules EOF;

rules: rev # revSingle
    | rev_expression # revExpression
    | 'since' '=' date # revSince
    | 'until' '=' date # revUntil
    | 'after' '=' date # revAfter
    | 'skip' '=' DIGIT # revSkip
    | 'before' '=' date # revBefore
    | 'max-age' '=' date # revMaxAge
    | 'min-age' '=' date # revMinAge
    | 'author' '=' ANY+ # revAuthor
    | 'commiter' '=' ANY+ # revCommiter
    | 'grep' '=' ANY+ # revGrep
    | rules '..' # revRangeAfter1
    | rules '...' # revRangeAfter2
    | rules (' ' rules)+ # revMulti
    | rules '..' rules # revRange1
    | rules '...' rules # revRange2
    | '..' rules # revRangeBefore1
    | '...' rules # revRangeBefore2
    ;

rev: refname # refName
    | OID # refOID
    | '^' rev # revExclude
    ;

refname: 'HEAD'
    | '@'
    ;

rev_expression: rev rev_direction rev_position
    | rev rev_direction DIGIT
    | ':/' (ANY | ' ')+
    | rev ':' ANY+ // path
    | ':' DIGIT ':' ANY+
    ;

rev_position: '@'
    | '!'
    | SIGNED_DIGIT
    | '-'
    | '{' ref_anchor? '}'
    ;

rev_direction: '@'
    | '^'
    | '~'
    ;

ref_anchor: date # anchorDate
    | SIGNED_DIGIT # anchorSignedDigit
    | DIGIT # anchorDigit
    | '/' .+? # anchorText
    | iso_8601 # anchorIso
    ;

date: 'yesterday' # yesterday
    | 'today' # today
    | time_point (' ' time_point)* ' ' TIME_DIRECTION # timepoint
    ;

time_point: (TIME_VALUE | DIGIT) ' ' TIME_UINT;

TIME_VALUE: 'one'
    | 'two'
    | 'three'
    | 'four'
    | 'five'
    | 'six'
    | 'seven'
    | 'eight'
    | 'nine'
    | 'ten'
    ;

TIME_UINT: 'second'
    | 'minute'
    | 'hour'
    | 'day'
    | 'week'
    | 'month'
    | 'year'
    | 'seconds'
    | 'minutes'
    | 'hours'
    | 'days'
    | 'weeks'
    | 'months'
    | 'years'
    ;

TIME_DIRECTION: 'ago' | 'after' ;

// iso 8061
iso_8601: ISO_DATE (' ' ISO_TIME IS_TIME_POSTFIX?)?
    ;
