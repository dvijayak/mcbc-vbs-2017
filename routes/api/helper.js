const ApiHelper = {};

ApiHelper.STATUS = {
   ok: "OK",
   error: "ERROR", // generic error
   missing: "NOT FOUND"
   forbidden: "FORBIDDEN",
};

// Standard function for issuing responses to API requests
// Expected to be attached to the Express response object
ApiHelper.respond = function (status, statusCode, data) {
   const res = this; // assumes that we've been attached
   if (!res || // probably unnecessary?
       !status ||
       typeof status !== 'string' ||
       (data && typeof data !== 'object')
      )
      return false;

   // Normalize status and status codes
   status = status.toUpperCase();
   statusCode = parseInt(statusCode);

   if (!statusCode) {
      if (status == ApiHelper.STATUS.ok)
         statusCode = 200;
      else if (status == ApiHelper.STATUS.error)
         statusCode = 400; // by default, errors will be sent as 400 Bad Request
      else if (status == ApiHelper.STATUS.missing)
         statusCode = 404;
      else if (status == ApiHelper.STATUS.forbidden)
         statusCode = 403;
   }

   // Normalize data payload
   if (!data) {
      data = {}
   } else if (data instanceof Error) {
      data = {
         name: data.name,
         message: data.message,
         stack: data.stack
      }
   }

   // Now, set the response
   res.statusCode(statusCode);
   res.json({
      statusCode: statusCode,
      status: status,
      data: data
   });

   return true;
};

module.exports = ApiHelper;