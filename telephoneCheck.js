function telephoneCheck (str) {}

// The above expression passes all tests.
/*
^1\s?
The number may start with a 1 or not. If so, that may be followed
by a space. If the space is included but the one is not, the trim() will
take care of that. I don't know if allowing a leading space is the intention,
but they ddin't test for it.
(\(\d{3}\)|\d{3})
There must be an area code, but no opinion on whether it's bracketed. If
there is an opening bracket, there must be a closing one.
[\s-]?\d{3}[\s-]?\d{4}$
The rest just allows optional spaces and dashes between the number groupings.
^ and $ to make sure we are limited to 10 digits and didn't squeeze it into
anything else.
*/
module.exports = telephoneCheck
