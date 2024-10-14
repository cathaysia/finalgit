// ex: set ft=antlr:
// https://git-scm.com/docs/revisions#Documentation/revisions.txt
grammar reversion;

reversion: starts sep offset;

starts: 'HEAD'
    | '@'
    | OID
    | TAG
    ;

sep: '~' | '^';

offset: DIGIT
    | '{' date '}'
    ;

date: 'yesterday'
    | iso
    | relative_date
    ;

iso: DATE TIME?;

DATE: [0-9]{4} '-' [0-9]{1,2} '-' [0-9]{1,2};
TIME: [0-9]{1,2} '-' [0-9]{1,2} '-' [0-9]{1,2};

relative_date: precise_date ' ' time_direction;
precise_date: DIGIT ' ' time_unit
    | precise_date ' ' precise_date
    ;
time_unit: 'seconds'
    | 'minutes'
    | 'hours'
    | 'days'
    | 'years'
    ;
time_direction: 'ago'
    | 'after'
    ;

DIGIT: [0-9]+ ;
OID: [0-9a-fA-F]{6,40};
TAG: [0-9a-fA-F-.]+;

WS: [ \t\r\n]+ -> skip;
