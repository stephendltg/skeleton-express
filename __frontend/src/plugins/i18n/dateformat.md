Day —————-
d	Day of the month, 2 digits with leading zero: 01 to 31
D	A textual representation of a day, three letters: Mon through Sun
j	Day of the month without leading zeros: 1 to 31
l (lowercase 'L')	A full textual representation of the day of the week: Sunday through Saturday
N	ISO-8601 numeric representation of the day of the week: 1 (for Monday) through 7 (for Sunday)
w	Numeric representation of the day of the week: 0 (for Sunday) through 6 (for Saturday)

Month	---	---
F	A full textual representation of a month, such as January or March
m	Numeric representation of a month, with leading zeros: 01 through 12
M	A short textual representation of a month, three letters: Jan through Dec
n	Numeric representation of a month, without leading zeros: 1 through 12
!* t	Number of days in the given month	28 through 31

Year	---	---
!* L	Whether it's a leap year	1 if it is a leap year, 0 otherwise.
Y	A full numeric representation of a year, 4 digit : 1999 or 2003
y	A two digit representation of a year	Examples: 99 or 03

Time	---	---
a	Lowercase Ante meridiem and Post meridiem: am or pm
A	Uppercase Ante meridiem and Post meridiem: AM or PM
g	12-hour format of an hour without leading zeros : 1 through 12
G	24-hour format of an hour without leading zeros: 0 through 23
h	12-hour format of an hour with leading zeros: 01 through 12
H	24-hour format of an hour with leading zeros: 00 through 23
i	Minutes with leading zeros	00 to 59
s	Seconds with leading zeros	00 through 59
v	Milliseconds Same note applies as for u : 654

Timezone	---	---
e	Timezone identifier: UTC, GMT, Atlantic/Azores
O	Difference to Greenwich time (GMT) in hours : +0200

Full Date/Time	---	---
c	date:	2004-02-12T15:19:21.000Z
r	» RFC 2822 formatted date	Example: Thu, 21 Dec 2000 16:01:07 +0200
U	Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)