---
title: Functions
keywords: [Seata]
description: Seata Functions
---

# Functions

The table below lists the support for functions in DQL and DML statements. It is important to note that functions cannot be used as primary keys in DML statements. 

### DML Statement Support


| Type                                                  | Supported or not |
| :---------------------------------------------------- | :------- |
| CONCAT(string2[,...])                                 | Yes       |
| INSTR(string,substring)                               | Yes       |
| LCASE(string2)                                        | Yes       |
| LEFT(string2,length)                                  | Yes       |
| LENGTH(string)                                        | Yes       |
| LOAD_FILE(file_name)                                  | Yes       |
| LOCATE(substring,string[,start_position])             | Yes       |
| LPAD(string2,length,pad)                              | Yes       |
| LTRIM(string2)                                        | Yes       |
| REPEAT(string2,count)                                 | Yes       |
| REPLACE(str,search_str,replace_str)                   | Yes       |
| RPAD(string2,length,pad)                              | Yes       |
| RTRIM(string2)                                        | Yes       |
| STRCMP(string1,string2)                               | Yes       |
| SUBSTRING(str,position[,length])                      | Yes       |
| TRIM([[BOTH\|LEADING\|TRAILING][padding]FROM]string2) | Yes       |
| UCASE(string2)                                        | Yes       |
| RIGHT(string2,length)                                 | Yes       |
| SPACE(count)                                          | Yes       |
| ABS(number2)                                          | Yes       |
| BIN(decimal_number)                                   | Yes       |
| CEILING(number2)                                      | Yes       |
| CONV(number2,from_base,to_base)                       | Yes       |
| FLOOR(number2)                                        | Yes       |
| FORMAT(number,decimal_places)                         | Yes       |
| HEX(DecimalNumber)                                    | Yes       |
| LEAST(number,number2[,..])                            | Yes       |
| MOD(numerator,denominator)                            | Yes       |
| POWER(number,power)                                   | Yes       |
| RAND([seed])                                          | Yes       |
| ROUND(number[,decimals])                              | Yes       |
| SIGN(number2)                                         | Yes       |
| SQRT(number2)                                         | Yes       |
| ADDTIME(date2,time_interval)                          | Yes       |
| CONVERT_TZ(datetime2,fromTZ,toTZ)                     | Yes       |
| CURRENT_DATE()                                        | Yes       |
| CURRENT_TIME()                                        | Yes       |
| CURRENT_TIMESTAMP()                                   | Yes       |
| DATE(datetime)                                        | Yes       |
| DATE_ADD(date2,INTERVALd_valued_type)                 | Yes       |
| DATE_FORMAT(datetime,FormatCodes)                     | Yes       |
| DATE_SUB(date2,INTERVALd_valued_type)                 | Yes       |
| DATEDIFF(date1,date2)                                 | Yes       |
| DAY(date)                                             | Yes       |
| DAYNAME(date)                                         | Yes       |
| DAYOFWEEK(date)                                       | Yes       |
| DAYOFYEAR(date)                                       | Yes       |
| EXTRACT(interval_nameFROMdate)                        | Yes       |
| MAKEDATE(year,day)                                    | Yes       |
| MAKETIME(hour,minute,second)                          | Yes       |
| MONTHNAME(date)                                       | Yes       |
| NOW()                                                 | Yes       |
| SEC_TO_TIME(seconds)                                  | Yes       |
| STR_TO_DATE(string,format)                            | Yes       |
| TIMEDIFF(datetime1,datetime2)                         | Yes       |
| TIME_TO_SEC(time)                                     | Yes       |
| WEEK(date_time[,start_of_week])                       | Yes       |
| YEAR(datetime)                                        | Yes       |
| DAYOFMONTH(datetime)                                  | Yes       |
| HOUR(datetime)                                        | Yes       |
| LAST_DAY(date)                                        | Yes       |
| MICROSECOND(datetime)                                 | Yes       |
| MONTH(datetime)                                       | Yes       |
| MINUTE(datetime)                                      | Yes       |
| FIRST()                                               | No        |
| LAST()                                                | No        |
| MIN()                                                 | No        |
| MAX()                                                 | No        |
| AVG()                                                 | No        |
| SUM()                                                 | No        |
| COUNT()                                               | No        |

### DQL Statement Support


| Type                                                  | Read Uncommitted | Read Committed |
| :---------------------------------------------------- | :--------------- | :------------- |
| CONCAT(string2[,...])                                 | Yes              | Yes            |
| INSTR(string,substring)                               | Yes              | Yes            |
| LCASE(string2)                                        | Yes              | Yes            |
| LEFT(string2,length)                                  | Yes              | Yes            |
| LENGTH(string)                                        | Yes              | Yes            |
| LOAD_FILE(file_name)                                  | Yes              | Yes            |
| LOCATE(substring,string[,start_position])             | Yes              | Yes            |
| LPAD(string2,length,pad)                              | Yes              | Yes            |
| LTRIM(string2)                                        | Yes              | Yes            |
| REPEAT(string2,count)                                 | Yes              | Yes            |
| REPLACE(str,search_str,replace_str)                   | Yes              | Yes            |
| RPAD(string2,length,pad)                              | Yes              | Yes            |
| RTRIM(string2)                                        | Yes              | Yes            |
| STRCMP(string1,string2)                               | Yes              | Yes            |
| SUBSTRING(str,position[,length])                      | Yes              | Yes            |
| TRIM([[BOTH\|LEADING\|TRAILING][padding]FROM]string2) | Yes              | Yes            |
| UCASE(string2)                                        | Yes              | Yes            |
| RIGHT(string2,length)                                 | Yes              | Yes            |
| SPACE(count)                                          | Yes              | Yes            |
| ABS(number2)                                          | Yes              | Yes            |
| BIN(decimal_number)                                   | Yes              | Yes            |
| CEILING(number2)                                      | Yes              | Yes            |
| CONV(number2,from_base,to_base)                       | Yes              | Yes            |
| FLOOR(number2)                                        | Yes              | Yes            |
| FORMAT(number,decimal_places)                         | Yes              | Yes            |
| HEX(DecimalNumber)                                    | Yes              | Yes            |
| LEAST(number,number2[,..])                            | Yes              | Yes            |
| MOD(numerator,denominator)                            | Yes              | Yes            |
| POWER(number,power)                                   | Yes              | Yes            |
| RAND([seed])                                          | Yes              | Yes            |
| ROUND(number[,decimals])                              | Yes              | Yes            |
| SIGN(number2)                                         | Yes              | Yes            |
| SQRT(number2)                                         | Yes              | Yes            |
| ADDTIME(date2,time_interval)                          | Yes              | Yes            |
| CONVERT_TZ(datetime2,fromTZ,toTZ)                     | Yes              | Yes            |
| CURRENT_DATE()                                        | Yes              | Yes            |
| CURRENT_TIME()                                        | Yes              | Yes            |
| CURRENT_TIMESTAMP()                                   | Yes              | Yes            |
| DATE(datetime)                                        | Yes              | Yes            |
| DATE_ADD(date2,INTERVALd_valued_type)                 | Yes              | Yes            |
| DATE_FORMAT(datetime,FormatCodes)                     | Yes              | Yes            |
| DATE_SUB(date2,INTERVALd_valued_type)                 | Yes              | Yes            |
| DATEDIFF(date1,date2)                                 | Yes              | Yes            |
| DAY(date)                                             | Yes              | Yes            |
| DAYNAME(date)                                         | Yes              | Yes            |
| DAYOFWEEK(date)                                       | Yes              | Yes            |
| DAYOFYEAR(date)                                       | Yes              | Yes            |
| EXTRACT(interval_nameFROMdate)                        | Yes              | Yes            |
| MAKEDATE(year,day)                                    | Yes              | Yes            |
| MAKETIME(hour,minute,second)                          | Yes              | Yes            |
| MONTHNAME(date)                                       | Yes              | Yes            |
| NOW()                                                 | Yes              | Yes            |
| SEC_TO_TIME(seconds)                                  | Yes              | Yes            |
| STR_TO_DATE(string,format)                            | Yes              | Yes            |
| TIMEDIFF(datetime1,datetime2)                         | Yes              | Yes            |
| TIME_TO_SEC(time)                                     | Yes              | Yes            |
| WEEK(date_time[,start_of_week])                       | Yes              | Yes            |
| YEAR(datetime)                                        | Yes              | Yes            |
| DAYOFMONTH(datetime)                                  | Yes              | Yes            |
| HOUR(datetime)                                        | Yes              | Yes            |
| LAST_DAY(date)                                        | Yes              | Yes            |
| MICROSECOND(datetime)                                 | Yes              | Yes            |
| MONTH(datetime)                                       | Yes              | Yes            |
| MINUTE(datetime)                                      | Yes              | Yes            |
| FIRST()                                               | Yes              | No             |
| LAST()                                                | Yes              | No             |
| MIN()                                                 | Yes              | No             |
| MAX()                                                 | Yes              | No             |
| AVG()                                                 | Yes              | No             |
| SUM()                                                 | Yes              | No             |
| COUNT()                                               | Yes              | No             |
